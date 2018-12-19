import { TemplateContext, BackboneView, BackboneModel, BackboneFormView } from 'sc-types-frontend';

export default class BindView<Model extends BackboneModel<Context>= BackboneModel<Context>, Context extends TemplateContext = TemplateContext> extends BackboneView<Model, Context> {

  template = (c: Context) => `<div>JSXView: template not implemented</div>`

  _bindings: any
  // heads up - a getter for this.bindings, because we need to return a new high level object each time
  public get bindings() {
    return BindView.buildBindings(this)
  }

  getContext() {
    const s = super.getContext()
    BackboneFormView.add(this as any, { noCloneModel: true })
    return {...s, ...this.model.attributes}
  }

  protected bindAttribute(name: keyof Context): string {
    return BindView.buildBindAttribute(name+'')
  }

  static buildBindAttribute(name: string): string {
    return `data-bind="${name}"`
  }

  static buildBindings(view: {_bindings:any, model: {attributes: {[k:string]:any}}}){
    if (!view._bindings) {
      const boundAttributes = Object.keys(view.model.attributes)
      const b = {} as any
      boundAttributes.forEach(a => {
        const k = `[${BindView.buildBindAttribute(a)}]`
        b![k] = a
      })
      view._bindings = b
    }
    return { ...view._bindings }
  }
}