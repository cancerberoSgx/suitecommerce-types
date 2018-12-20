import { TemplateContext, BackboneView, BackboneModel, BackboneFormView } from 'sc-types-frontend';
import  BindView from '../view/BindView';
import JSXView  from './JSXView';
import { ReactLikeElement } from '../reactLike';
/**
 * Mixing of BindView and JSXView using <Bind>.
 * 
 * TODO: would be awesome if I could bind in a collection / iterating, something
 */
export default class JSXBindView<Model extends BackboneModel<Context>= BackboneModel<Context>, Context extends TemplateContext = TemplateContext> extends JSXView<Model, Context> {

  template = (c: Context) => `<div>JSXBindView: template not implemented</div>`

  _bindings: any
  // heads up - a getter for this.bindings, because we need to return a new high level object each time
  public get bindings() {
    return BindView.buildBindings(this as any)
  }

  getContext() {
    const s = super.getContext()
    BackboneFormView.add(this as any, { noCloneModel: true })
    return {...s, ...this.model.attributes}
  }

}

