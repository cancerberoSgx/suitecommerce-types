import { BackboneView, BackboneViewBindings } from "../thirdParty";

export const BackboneFormView = {
  /** See `BackboneView.bindings` property docs . 
   * 
   * Transform given view into a Backbone.FormView , that is able to double binding using given `bindings` property (similar to events). After the call the given view instance will have saveForm() method defined */
  add(view: BackboneView&{bindings: BackboneViewBindings}, options: BackboneFormViewOptions):any {
    throw new Error('not impl')
  }
}

export interface BackboneFormViewOptions {
  noCloneModel: boolean
}
