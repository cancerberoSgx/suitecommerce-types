declare type _un2_iQu3_<I = any, J = any, K = any, L = any, M = any> = any;
declare type BackboneModel<I = (any | _un2_iQu3_), J = (any | _un2_iQu3_), K = (any | _un2_iQu3_), L = (any | _un2_iQu3_), M = (any | _un2_iQu3_)> = any | _un2_iQu3_;
import { TemplateContext } from 'sc-types-frontend';
export interface JSXViewOptions<Model extends BackboneModel = BackboneModel> extends Backbone.ViewOptions<Model> {
    dontEmptyContainer?: boolean;
    supportsFunctionAttributes?: boolean;
}
export declare type JSXTemplate<Context extends TemplateContext> = (context: Context) => JSX.Element;
export {};
