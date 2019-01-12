
const ReactLike_ = {
  /**
   * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
   */
  createElement(tag: string, attrs: any = {}, ...children: any[]): HTMLElement {
    var element: HTMLElement = document.createElement(tag)
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        var value: any = attrs[name]
        if (value === true) {
          element.setAttribute(name, name)
        }
        else if (typeof value === 'function') {
          if (ReactLike_.supportFunctionAttributes) {
            // see JSXView.render if supportsFunctionAttributes=== true there could be some parent that could have the _this view context as property. 
            element.setAttribute(name, `var _this = ReactLike._searchForThisView(this) || this; (${value.toString()}).apply(_this, arguments)`)
          }
          else {
            element.setAttribute(name, `(${value.toString()}).apply(this, arguments)`)
          }
        }
        else if (value !== false && value != null) {
          if (name === 'className') {
            name = 'class'
          }
          element.setAttribute(name, value.toString())
        }
      }
    }
    children.filter(c => c).forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child.toString()))
      }
      else {
        const asArray = Array.isArray(child) ? child : [child]
        asArray.forEach(c => element.appendChild(c))
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

  /** partial support for JSX attribute functions like event handlers. 
   * Experimental!, not recommended, set it to falsy to disable at all, or just use backbone's view events. 
   * If true, handlers will only have access to attributes and this, but they won't be able to reference 
   * other variables in the scope of the JSX. Also there could be some performance impact on event handling. 
   * */
  supportFunctionAttributes: false
};

(self as any).ReactLike = ReactLike_

export default ReactLike_;
