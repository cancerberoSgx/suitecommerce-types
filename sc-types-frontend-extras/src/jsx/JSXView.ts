import { BackboneModel, Backbone, BackboneView, PluginContainer, TemplateContext } from 'sc-types-frontend';
import ReactLike from '../reactLike/ReactLike';

/**
 * I'm a BackboneView that supports JSX templates with attribute `jsxTemplate` instead of the normal `template` one. 
 * 
 * I'm not a react-like component, I just render `jsxTemplate` and that's it, all the other logic like events, model, binding, etc is implemented by the normal BackboneView technologies. 
 * 
 * Optionally, if `ReactLike.supportFunctionAttributes && view.supportsFunctionAttributes` I have partial support for function attributes (like event handlers). 
 */
export default class JSXView<Model extends BackboneModel = BackboneModel, Context extends TemplateContext = TemplateContext> extends BackboneView<Model, Context> {

  template = (...args: any[]) => `<div>JSXView: template not implemented</div>`

  jsxTemplate: JSXTemplate<Context> = c => { throw new Error('jsxTemplate not implemented') }

  protected supportsFunctionAttributes?: boolean = false
  protected options: JSXViewOptions<Model> = {}

  initialize(options?: JSXViewOptions<Model>) {
    super.initialize(options as any)
    this.options = { ...this.options || {}, ...options }
    if (BackboneView.notInSc) {
      return
    }
    this.supportsFunctionAttributes = this.supportsFunctionAttributes || this.options.supportsFunctionAttributes
    if (!this.preRenderPlugins) {
      this.preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
    }
    this.preRenderPlugins.install({
      name: 'jsx',
      execute($fragment, view) {
        if (isJSXView(view)) {
          view._renderJsx($fragment)
        }
        return $fragment
      }
    })
  }

  render(): this {
    if (BackboneView.notInSc) {
      this.undelegateEvents()
      this.$el.empty()
      this._renderJsx(this.$el)
      this.delegateEvents()
      return this
    }
    else {
      return super.render() as this
    }
  }
  protected _renderJsx($fragment: JQuery<HTMLElement>) {
    const rendered = this.jsxTemplate(this.getContext());
    if (ReactLike.supportFunctionAttributes && this.supportsFunctionAttributes) {
      (rendered as any).__this = this
    }
    if (!this.options.dontEmptyContainer) {
      $fragment.empty()
    }
    ReactLike.renderJQuery($fragment, rendered)
  }
}

export interface JSXViewOptions<Model extends BackboneModel = BackboneModel> extends Backbone.ViewOptions<Model> {
  dontEmptyContainer?: boolean,
  supportsFunctionAttributes?: boolean
}

function isJSXView(view: any): view is JSXView<any, any> {
  return (view as any).jsxTemplate
}

export type JSXTemplate<Context extends TemplateContext> = (context: Context) => JSX.Element 
