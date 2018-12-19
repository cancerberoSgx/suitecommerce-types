import { TemplateContext, BackboneView, BackboneModel, BackboneFormView } from 'sc-types-frontend';

export default class BindView<Model extends BackboneModel<Context>= BackboneModel<Context>, Context extends TemplateContext = TemplateContext> extends BackboneView<Model, Context> {

  template = (c: Context) => `<div>JSXView: template not implemented</div>`

  _bindings: any
  // heads up - a getter for this.bindings, because we need to return a new high level object each time
  public get bindings() {
    if (!this._bindings) {
      const boundAttributes = Object.keys(this.model.attributes)
      const b = {} as any
      boundAttributes.forEach(a => {
        const k = `[${this.bindAttribute(a as any)}]`
        b![k] = a
      })
      this._bindings = b
    }
    return { ...this._bindings }
  }

  getContext() {
    // this needs to be called each time and this.bindings needs to be high level new object each time that's why the getter
    BackboneFormView.add(this as any, { noCloneModel: true })
    return this.model.attributes
  }

  protected bindAttribute(name: keyof Context): string {
    return `data-bind="${name}"`
  }

}