import transformers from './transformers'
import TypeGuards from './typeGuards'
import { ReactLikeCreateElement, ReactLikeTag, ReactLikeAttrs, ReactLikeElement, ReactLikeChild, ReactLike } from './ReactLike';
// import ReactLike from './ReactLike'


type RR = ReactLike  & ({ _searchForThisView(el: HTMLElement | null): any})

function getThis(): RR {
  return (self as any).ReactLike
}

const Module: ReactLikeCreateElement = {

  supportFunctionAttributes: false,

  createElement(tag: ReactLikeTag, attrs: ReactLikeAttrs = {}, ...children: ReactLikeChild[]): ReactLikeElement {
    const originalAttrs = attrs;
    var element: ReactLikeElement;
    if (typeof tag === 'string') {
      element = document.createElement(tag);
    }
    else {
      if (TypeGuards.isReactLikeComponent(tag)) {
        // support for class elements (react-component like)
        element = new tag({ ...attrs, children: children }).render();
      }
      else {
        // support for function elements (react-stateless like)
        element = tag({ ...attrs, children: children });
      }
      // custom tags cannot declare html attributes, only their own props, so we are removing them 
      // in order not to add them as html attrs in the following code
      attrs = {};
    }
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        var value: any = attrs[name];
        if (value === true) {
          element.setAttribute(name, name);
        }
        else if (typeof value === 'function') {
          if (getThis().supportFunctionAttributes) {
            // see JSXView.render if supportsFunctionAttributes=== true there could be some parent that could have the _this view context as property. 
            const innerApply = `(function(){(${value.toString()}).apply(__this__, arguments)}).apply(__this__, arguments); `;
            element.setAttribute(name, `var __this__ = ReactLike._searchForThisView(this) || this; var _this = typeof _this === 'undefined' ? __this__ : _this; return ${innerApply}`);
          }
          else {
            element.setAttribute(name, `(${value.toString()}).apply(this, arguments)`);
          }
        }
        else if (value !== false && value != null && typeof value !== 'object') {
          if (name === 'className') {
            name = 'class';
          }
          element.setAttribute(name, value.toString());
        }
        else {
          console.log('ignoring attribute type ', typeof value, value);
        }
      }
    }
    children.filter(c => c).forEach(child => {
      if (TypeGuards.isNode(child)) {
        const toAppend = transformers._transformChild(tag, originalAttrs, element, child);
        _addChild(tag, originalAttrs, element, toAppend);
      }
      else if (Array.isArray(child)) {
        child.forEach(c => {
          if (!TypeGuards.isNode(c)) {
            throw new Error('Child is not a node: ' + c + ', tag: ' + tag + ', originalAttrs: ' + originalAttrs);
          }
          const toAppend = transformers._transformChild(tag, originalAttrs, element, c);
          _addChild(tag, originalAttrs, element, toAppend);
        });
      }
      else {
        const toAppend = document.createTextNode(transformers._transformText(tag, originalAttrs, element, child, child + ''));
        _addChild(tag, originalAttrs, element, toAppend);
      }
    });
    return element;
  },

  _searchForThisView(el: HTMLElement | null): any {
    //heads up ! this is executed without context in the html element onclick handler this is why `(self as any).ReactLike`
    return el && (el as any).__this || getThis()._searchForThisView(el!.parentElement)
  },

  // TODO: ChildAdder just like ChildTransformer, TextTransformer - a parent might want to cancel child append for some reason...
  _addChild: _addChild,

} as ReactLikeCreateElement


function _addChild(tag: ReactLikeTag, attrs: ReactLikeAttrs, element: HTMLElement, toAppend: Node): void {
  if (TypeGuards.isReactLikeChildAddTransformer(tag)) {
    tag.addChild(tag, attrs, element, toAppend)
  }
  element.appendChild(toAppend)
}

export default Module as ReactLikeCreateElement



