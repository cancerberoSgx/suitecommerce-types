export declare type ReactLikeAttrs = {
    [k: string]: any;
};
export declare type ReactLikeChild = ReactLikeElement | string;
export declare type ReactLikeProps = ReactLikeAttrs & {
    children: ReactLikeChild[];
};
export declare type ReactLikeValue = string | boolean | number;
export declare type ReactLikeTransformer = Partial<ReactLikeChildAddTransformer & ReactLikeTextTransformer & ReactLikeChildTransformer>;
export declare type ReactLikeElement = HTMLElement;
export declare type ReactLikeComponent = {
    new (props: ReactLikeProps): ReactLikeComponent;
    render(): ReactLikeElement;
};
export declare type ReactLikeFunction = (props: ReactLikeProps) => ReactLikeElement;
export declare type ReactLikeTag = string | (ReactLikeTransformer & ReactLikeComponent) | (ReactLikeTransformer & ReactLikeFunction);
export interface ReactLikeTextTransformer {
    transformText(tag: any, attrs: any, parent: HTMLElement, child: Node | ReactLikeValue, text: string): string;
}
export interface ReactLikeChildTransformer {
    transformChild(tag: any, attrs: any, parent: HTMLElement, child: Node): Node;
}
export interface ReactLikeChildAddTransformer {
    addChild(tag: any, attrs: any, element: HTMLElement, toAppend: Node): void;
}
