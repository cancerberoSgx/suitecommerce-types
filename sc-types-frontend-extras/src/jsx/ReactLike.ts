
// TODO: make this a class

export type ReactLikeAttrs = {[k:string]:any}
export type ReactLikeChild = ReactLikeElement|string
export type ReactLikeProps = ReactLikeAttrs&{children: ReactLikeChild[]}
export type ReactLikeValue = string|boolean|number
export type ReactLikeTransformer = Partial<ReactLikeChildAddTransformer&ReactLikeTextTransformer&ReactLikeChildTransformer>
export type ReactLikeElement = HTMLElement
export type ReactLikeComponent = {
  new (props: ReactLikeProps): ReactLikeComponent
  render(): ReactLikeElement
}
export type ReactLikeFunction = (props: ReactLikeProps)=>ReactLikeElement
export type ReactLikeTag = string|(ReactLikeTransformer&ReactLikeComponent)|(ReactLikeTransformer&ReactLikeFunction)


const ReactLike_ = {
  /**
   * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
   */
  createElement(tag: ReactLikeTag, attrs: ReactLikeAttrs = {}, ...children: ReactLikeChild[]): ReactLikeElement {
    const originalAttrs = attrs
    var element: ReactLikeElement
    if (typeof tag === 'string') {
      element = document.createElement(tag)
    }
    else {
      if (isReactLikeComponent(tag)) {
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
            element.setAttribute(name, `var __this__ = ReactLike._searchForThisView(this) || this; var _this = typeof _this === 'undefined' ? __this__ : _this; return ${innerApply}`)
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
        else {
          console.log('ignoring attribute type ', typeof value, value);
        }
      }
    }
  
    children.filter(c => c).forEach(child => {
      if (isNode(child)) {
        const toAppend = ReactLike_._transformChild(tag, originalAttrs, element, child)
        ReactLike_._addChild(tag, attrs, element, toAppend)
      }
      else if (Array.isArray(child)) {
        child.forEach(c => {
          if (!isNode(c)) {
            throw new Error('Child is not a node: ' + c + ', tag: ' + tag + ', originalAttrs: ' + originalAttrs)
          }
          const toAppend = ReactLike_._transformChild(tag, originalAttrs, element, c)
          ReactLike_._addChild(tag, attrs, element, toAppend)
        })
      }
      else {
        const toAppend = document.createTextNode(ReactLike_._transformText(tag, originalAttrs, element, child, child+''))
        ReactLike_._addChild(tag, attrs, element, toAppend)
      }
    })
    return element
  },

  renderDOM(parent: HTMLElement, el: JSX.Element): void {
    parent.appendChild(el as any)
  },

  renderJQuery(parent: JQuery<HTMLElement>, el: JSX.Element): void {
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

  _globalTextTransformers: [] as ReactLikeTextTransformer[],

  registerTextTransformer(transform: ReactLikeTextTransformer): void {
    ReactLike_._globalTextTransformers.push(transform)
  },

  /**
   * Converts all TextNodes, first applies the global TextTransformer s registered with ReactLike.globalTextTransformers() and then if the tag is a TextTransformer also that
   */
  _transformText(tag: ReactLikeTag, attrs: ReactLikeAttrs, parent: HTMLElement, child: Node|ReactLikeValue, text: string): string {
    ReactLike_._globalTextTransformers.forEach(t=>{
      text = t.transformText(tag, attrs, parent, child, text)
    })
    if(isTextTransformer(tag)){
      text = tag.transformText(tag, attrs, parent, child, text)
    }
    return text
  },
  
  _globalChildTransformers :  [] as ReactLikeChildTransformer[],
  registerElementTransform(transform: ReactLikeChildTransformer): void {
    ReactLike_._globalChildTransformers.push(transform)
  },
  _transformChild(tag: ReactLikeTag, attrs: ReactLikeAttrs, parent: HTMLElement, child: Node): Node {
    ReactLike_._globalChildTransformers.forEach(t=>{
      child = t.transformChild(tag, attrs, parent, child)
    })
    if(isChildTransformer(tag)){
      child = tag.transformChild(tag, attrs, parent, child)
    }
    return child
  },

  // TODO: ChildAdder just like ChildTransformer, TextTransformer - a parent might want to cancel child append for some reason...
  _addChild(tag: ReactLikeTag, attrs: ReactLikeAttrs, element: HTMLElement, toAppend: Node):void{
    if(isReactLikeChildAddTransformer(tag)){
      tag.addChild(tag, attrs, element, toAppend)
    }
    else {
      element.appendChild(toAppend)
    }
  },

};

export interface ReactLikeTextTransformer {
  transformText(tag: any, attrs: any, parent: HTMLElement, child: Node|ReactLikeValue, text: string): string
}
function isTextTransformer(n: any): n is ReactLikeTextTransformer {
  return n && n.transformText
}
export interface ReactLikeChildTransformer {
  transformChild(tag: any, attrs: any, parent: HTMLElement, child: Node): Node
}
function isChildTransformer(n: any): n is ReactLikeChildTransformer {
  return n && n.transformChild
}
export interface ReactLikeChildAddTransformer {
  addChild(tag: any, attrs: any, element: HTMLElement, toAppend: Node):void
}
function isReactLikeChildAddTransformer(n: any): n is ReactLikeChildAddTransformer {
  return n && n.addChild
}
function isNode(n: any): n is Node {
  return n && n.nodeType
}
function isReactLikeComponent(c: any): c is ReactLikeComponent {
  return c.prototype && c.prototype.render
}


(self as any).ReactLike = ReactLike_

export default ReactLike_