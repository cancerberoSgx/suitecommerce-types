
const ReactLike_ = {
  /**
   * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
   */
  createElement(tag: string, attrs: any = {}, ...children: any[]): HTMLElement {
    var element: HTMLElement = document.createElement(tag)
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        var value: string | null | boolean = attrs[name]
        if (value === true) {
          element.setAttribute(name, name)
        } else if (value !== false && value != null) {
          if (name === 'className') {
            name = 'class'
          }
          element.setAttribute(name, value.toString())
        }
      }
    }
    children.forEach(child => {
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
  }
};

(self as any).ReactLike = ReactLike_

export default ReactLike_