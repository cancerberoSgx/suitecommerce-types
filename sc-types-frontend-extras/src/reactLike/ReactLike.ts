
import createElementModule from './createElement';
import render from './render';
import transformers from './transformers';


export interface ReactLikeCreateElement {
  /**
   * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
   */
  createElement(tag: ReactLikeTag, attrs: ReactLikeAttrs, ...children: ReactLikeChild[]): ReactLikeElement


  /** 
   * Partial support for JSX attribute functions like event handlers. 
   * Experimental!, not recommended, set it to falsy to disable at all, or just use backbone's view events. 
   * If true, handlers will only have access to attributes and this, but they won't be able to reference 
   * other variables in the scope of the JSX. Also there could be some performance impact on event handling. 
   * */
  supportFunctionAttributes: boolean
}

export type ReactLikeAttrs = {
  [k: string]: any;
};
export type ReactLikeChild = ReactLikeElement | string;
export type ReactLikeProps = ReactLikeAttrs & {
  children: ReactLikeChild[];
};
export type ReactLikeValue = string | boolean | number;
export type ReactLikeElement = HTMLElement;
export type ReactLikeComponent = {
  new(props: ReactLikeProps): ReactLikeComponent;
  render(): ReactLikeElement;
};
export type ReactLikeFunction = (props: ReactLikeProps) => ReactLikeElement;
export type ReactLikeTag = string | (ReactLikeTransformer & ReactLikeComponent) | (ReactLikeTransformer & ReactLikeFunction);






export interface ReactLikeRender {
  renderDOM(parent: HTMLElement, el: JSX.Element): void
  renderJQuery(parent: JQuery<HTMLElement>, el: JSX.Element): void
}






export interface ReactLikeTextTransformer {
  transformText(tag: any, attrs: any, parent: HTMLElement, child: Node | ReactLikeValue, text: string): string;
}
export interface ReactLikeChildTransformer {
  transformChild(tag: any, attrs: any, parent: HTMLElement, child: Node): Node;
}
export interface ReactLikeChildAddTransformer {
  addChild(tag: any, attrs: any, element: HTMLElement, toAppend: Node): void;
}

export interface Transformers {
  addChildTransformer(transform: ReactLikeChildTransformer): void
  addTextTransformer(transform: ReactLikeTextTransformer): void
}



export type ReactLikeTransformer = Partial<ReactLikeChildAddTransformer & ReactLikeTextTransformer & ReactLikeChildTransformer>;

const ReactLike_: ReactLike = { ...createElementModule, ...render, ...transformers } as ReactLike;
export interface ReactLike extends ReactLikeCreateElement, ReactLikeRender, Transformers {
}
(self as any).ReactLike = ReactLike_;
export default ReactLike_ as ReactLike;
