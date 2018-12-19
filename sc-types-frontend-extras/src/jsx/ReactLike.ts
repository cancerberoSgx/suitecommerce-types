// TODO: make this a class

const ReactLike_ = {
  /**
   * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
   */
  createElement(tag: any, attrs: any = {}, ...children: any[]): HTMLElement {
    const originalAttrs = attrs
    var element: HTMLElement
    if (typeof tag === 'string') {
      element = document.createElement(tag)
    }
    else {
      if (tag.prototype && tag.prototype.render) {
        // support for class elements (react-component like)
        element = new tag({...attrs, children: children}).render()
      }
      else {
        // support for function elements (react-stateless like)
        element = tag({...attrs, children: children})
      }
      // custom tags cannot declare html attributes, only their own props, so we are removing them 
      // in order not to add them as html attrs in the following code
      attrs = {}
    }
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        var value: any = attrs[name]
        if (value === true) {
          element.setAttribute(name, name)
        }
        else if (typeof value === 'function') {
          if (ReactLike_.supportFunctionAttributes) {
            // see JSXView.render if supportsFunctionAttributes=== true there could be some parent that could have the _this view context as property. 
            const innerApply = `(function(){(${value.toString()}).apply(__this__, arguments)}).apply(__this__, arguments); `
            element.setAttribute(name, `var __this__ = ReactLike._searchForThisView(this) || this;  
            return ${innerApply}`)
          }
          else {
            element.setAttribute(name, `(${value.toString()}).apply(this, arguments)`)
          }
        }
        else if (value !== false && value != null && typeof value !== 'object') {
          if (name === 'className') {
            name = 'class'
          }
          element.setAttribute(name, value.toString())
        }
        // else {
        //   console.log('ignoring attribute type ', typeof value, value);
        // }
      }
    }
  
    children.filter(c => c).forEach(child => {
      if (isNode(child)) {
        const toAppend = ReactLike_.transformChild(tag, originalAttrs, element, child)
        ReactLike_.addChild(tag, attrs, element, toAppend)
      }
      else if (Array.isArray(child)) {
        child.forEach(c => {
          if (!isNode(c)) {
            throw new Error('Child is not a node: ' + c + ', tag: ' + tag + ', originalAttrs: ' + originalAttrs)
          }
          const toAppend = ReactLike_.transformChild(tag, originalAttrs, element, c)
          ReactLike_.addChild(tag, attrs, element, toAppend)
        })
      }
      else {
        const toAppend = document.createTextNode(ReactLike_.transformText(tag, originalAttrs, element, child, child.toString()))
        ReactLike_.addChild(tag, attrs, element, toAppend)
      }
    })
    return element
  },

  renderDOM(parent: HTMLElement, el: JSX.Element): void {
    parent.appendChild(el as any)
  },

  renderJQuery(parent: JQuery<HTMLElement>, el: JSX.Element | JQuery): void {
    parent.append(jQuery(el as any))
  },

  _searchForThisView: function (el: HTMLElement|null): any {
    return el && ((el as any).__this || ReactLike_._searchForThisView(el.parentElement))
  },

  /** 
   * Partial support for JSX attribute functions like event handlers. 
   * Experimental!, not recommended, set it to falsy to disable at all, or just use backbone's view events. 
   * If true, handlers will only have access to attributes and this, but they won't be able to reference 
   * other variables in the scope of the JSX. Also there could be some performance impact on event handling. 
   * */
  supportFunctionAttributes: false,

  globalTextTransformers: [] as TextTransformer[],

  registerTextTransformer(transform: TextTransformer): void {
    ReactLike_.globalTextTransformers.push(transform)
  },

  /**
   * Converts all TextNodes, first applies the global TextTransformer s registered with ReactLike.globalTextTransformers() and then if the tag is a TextTransformer also that
   */
  transformText(tag: any, attrs: any, parent: HTMLElement, child: Node, text: string): string {
    ReactLike_.globalTextTransformers.forEach(t=>{
      text = t.transformText(tag, attrs, parent, child, text)
    })
    if(isTextTransformer(tag)){
      text = tag.transformText(tag, attrs, parent, child, text)
    }
    return text
  },
  
  // registerElementTransform(transform: ElementTransform): void {
  //   elementTransforms.push(transform)
  // },
  transformChild(tag: any, attrs: any, parent: HTMLElement, child: Node): Node {
    if(tag.transformChild){
      child = tag.transformChild(tag, attrs, parent, child)
    }
    //   elementTransforms.forEach(t=>{ss=t(ss)})
    return child
  },

  // TODO: ChildAdder just like ChildTransformer, TextTransformer - a parent might want to cancel child append for some reason...
  addChild(tag: any, attrs: any, element: HTMLElement, toAppend: Node):void{
    element.appendChild(toAppend)
  },

};

export interface TextTransformer {
  transformText(tag: any, attrs: any, parent: HTMLElement, child: Node, text: string): string
}
function isTextTransformer(n: any): n is TextTransformer {
  return n && n.transformText
}
export interface ChildTransformer {
  transformChild(tag: any, attrs: any, parent: HTMLElement, child: Node): Node
}
function isChildTransformer(n: any): n is ChildTransformer {
  return n && n.transformChild
}
export interface ChildAdder {
  addChild(tag: any, attrs: any, element: HTMLElement, toAppend: Node):void
}
function isChildAdder(n: any): n is ChildAdder {
  return n && n.transformChild
}
// const textTransforms: TextTransform[] = []
// const elementTransforms: ElementTransform[] = []

// export interface ReactLike {
//   createElement(tag: any, attrs?: any, ...children: any[]): HTMLElement
//   supportFunctionAttributes:  boolean
//   renderJQuery(parent: JQuery<HTMLElement>, el: JSX.Element | JQuery): void 
//   renderDOM(parent: HTMLElement, el: JSX.Element): void

// }

// export type TextTransform = (s: string)=>string
// export type ElementTransform = (s: HTMLElement)=>HTMLElement;

(self as any).ReactLike = ReactLike_

// export default ReactLike_ as ReactLike;

export default ReactLike_;

function isNode(n: any): n is Node {
  return n && n.nodeType
}