// TODO: make this a class

const ReactLike_ = {
  /**
   * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
   */
  createElement(tag: any, attrs: any = {}, ...children: any[]): HTMLElement {

    var element: HTMLElement
    if (typeof tag === 'string') {
      element = document.createElement(tag)
    }
    else {
      if (tag.prototype && tag.prototype.render) {
        // support for class elements (react-component like)
        element = new tag(attrs).render()
      }
      else {
        // support for function elements (react-stateless like)
        element = tag(attrs)
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
      if (child.nodeType) {
        element.appendChild(ReactLike_._transformElementToAppend(child))
      }
      else if (Array.isArray(child)) {
        child.forEach(c => {
          if (!c.nodeType) {
            throw new Error('Child is not a node: ' + c + ', tag: ' + tag + ', attrs: ' + attrs)
          }
          element.appendChild(ReactLike_._transformElementToAppend(c))
        })
      }
      else {
        element.appendChild(document.createTextNode(ReactLike_._transformText(child.toString())))
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

  _searchForThisView: function (el: HTMLElement) {
    return el && ((el as any).__this || ReactLike_._searchForThisView(el.parentElement))
  },

  /** 
   * Partial support for JSX attribute functions like event handlers. 
   * Experimental!, not recommended, set it to falsy to disable at all, or just use backbone's view events. 
   * If true, handlers will only have access to attributes and this, but they won't be able to reference 
   * other variables in the scope of the JSX. Also there could be some performance impact on event handling. 
   * */
  supportFunctionAttributes: false,

  // registerTextTransform(transform: TextTransform): void {
  //   textTransforms.push(transform)
  // },
  _transformText(s: string): string {
    let ss = s
    //   textTransforms.forEach(t=>{ss=t(ss)})
    return ss
  },
  // registerElementTransform(transform: ElementTransform): void {
  //   elementTransforms.push(transform)
  // },
  _transformElementToAppend(s: HTMLElement): HTMLElement {
    let ss = s
    //   elementTransforms.forEach(t=>{ss=t(ss)})
    return ss
  }
};

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
