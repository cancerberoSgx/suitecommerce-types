import { TemplateContext, _, BackboneView, BackboneModel, BackboneFormView, BackboneViewWithBindings, BackboneViewBindings } from 'sc-types-frontend';
import { View } from 'backbone';
/**
 * Make it easy to work with double binding.
 * 
 * Note: exposes the functionality in static methods so other implementations (liks JSXBindView uses the same impl) 
 */
export default class BindView<Model extends BackboneModel<Context>= BackboneModel<Context>, Context extends TemplateContext = TemplateContext> extends BackboneView<Model, Context> {

  template = (c: Context) => `<div>JSXView: template not implemented</div>`

  _bindings: BackboneViewBindings = {}
  // heads up - a getter for this.bindings, because we need to return a new high level object each time is accessed (?)
  public get bindings(): BackboneViewBindings {
    return BindView.buildBindings(this as any) as BackboneViewBindings
  }

  // getContext(): Context {
  //   return BindView.getContext(this as any) as any
  // }
  // getContext() {
    // const s = super.getContext()
    // return {...s, ...this.model.attributes}
  // }

  static installFormView(v: any){
    if(v._getContext){
      console.log('exiting install form view ', BackboneFormView.add.toString().length, !!(v as any).stickit);

      // return 
    }
    v._getContext = v.getContext
    v.getContext = function(){
      return {...v._getContext(), ...v.model.attributes}
    }
    if(BackboneView.notInSc){
      const stickit = require('../../spec/ported/backbone.stickit')
      const   BackboneFormViewPartial =    require('../../spec/ported/BackboneFormViewPartial').default
      _.extend(v, stickit.ViewMixin)
      debugger
      console.log('installing stickit, partial: ', Object.keys(BackboneFormViewPartial), 'sitickit: ', Object.keys(stickit));
      Object.assign(BackboneFormView, BackboneFormViewPartial)
    }
    BackboneFormView.add(v as any, { noCloneModel: true })
  }

  render(): this{
    BindView.installFormView(this)
    super.render()
    return this
  }

  protected bindAttribute(name: keyof Context): string {
    return BindView.buildBindAttribute(name+'')
  }

  // static getContext<Model extends BackboneModel<TemplateContext> , Context extends TemplateContext = TemplateContext>(view:BackboneViewWithBindings<Model, Context> ): Context {
  //   // debugger
  //   const s = {} as any
  //   // const s = view.constructor.prototype. getContext.apply(view)// TODO: incompatible if they change getContext() signature
  //   // debugger
  //   BackboneFormView.add(view, { noCloneModel: true })
  //   return {...s, ...view.model.attributes}
  // }

  static buildBindAttribute(name: string): string {
    return `data-bind="${name}"`
  }

  static buildBindings<Model extends BackboneModel<Context>, Context extends TemplateContext = TemplateContext>(view: BackboneViewWithBindings<Model, Context>){
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
