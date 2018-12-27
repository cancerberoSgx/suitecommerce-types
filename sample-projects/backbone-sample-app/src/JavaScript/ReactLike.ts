import { TemplateContext } from 'sc-types-frontend';

export type JSXTemplate<Context extends TemplateContext> = (context: Context) => JSX.Element

const ReactLike_ ={
    /**
     * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
     */
     createElement (tag: string, attrs: any, children: any): HTMLElement {
        var element: HTMLElement = document.createElement(tag);
        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                var value: string | null | boolean = attrs[name];
                if (value === true) {
                    element.setAttribute(name, name);
                } else if (value !== false && value != null) {
                    if(name==='className') {
                        name='class'
                    }
                    element.setAttribute(name, value.toString());
                }
            }
        }
        for (let i:number = 2; i < arguments.length; i++) {
            let child:any = arguments[i];
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
        return element;
    }, 
    renderDOM(parent: HTMLElement, el: JSX.Element):void{
      parent.appendChild(el as any)
    },
    // renderJQuery(parent: JQuery<HTMLElement>, el: JSX.Element):void{
    //   parent.append(el as any)
    // }
};

// export function isJQuery($el: any): $el is JQuery<HTMLElement> {
//     return $el.append && $el.wrap && $el.el.length && $el.parent
// }

(self as any).ReactLike = ReactLike_

export const ReactLike = ReactLike_