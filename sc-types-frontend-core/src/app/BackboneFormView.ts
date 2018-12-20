import { BackboneView, BackboneModel, TemplateContext } from "../thirdParty";
import { Fn, TODO } from "../types";

export const BackboneFormView = {
  /** See `BackboneView.bindings` property docs . 
   *
   * Transform given view into a Backbone.FormView , that is able to double binding using given `bindings` property
   * (similar to events). After the call the given view instance will have saveForm() method defined 
   */
  add<Model extends BackboneModel<TemplateContext>, Context extends TemplateContext = TemplateContext>(view: BackboneView<Model, Context> & { bindings: BackboneViewBindings }, options?: BackboneFormViewOptions): any {
    debugger
    throw new Error('not impl')
  }
}

export interface BackboneFormViewOptions {
  noCloneModel: boolean
}


export interface BindingObject {
  setOptions? : {
    validate?: boolean
    silent?: boolean
  }
  observe?: BindingValue

  , events: string[]
}
export type BindingValue = string | BindingObject;

export type BackboneViewBindings = { [selector: string]: BindingValue }



export type BackboneViewWithBindings<Model extends BackboneModel<TemplateContext>= BackboneModel<TemplateContext>, Context extends TemplateContext = TemplateContext> = BackboneView<Model, Context> & { 
  bindings: BackboneViewBindings, 
  _bindings: BackboneViewBindings, 
  /**
    Using `this.bindings` configuration or the `optionalBindingsConfig`, binds `this.model`
    or the `optionalModel` to elements in the view. */
  stickit(optionalMode?: BackboneModel, optionalBindingsConfig?: any):TODO
  unstickit(model: BackboneModel, bindingSelector: string): TODO
   /** Add a single model binding to the view*/
   addBinding(optionalModel: BackboneModel, second: BackboneModel, _binding: BindingValue): TODO 
   
 }