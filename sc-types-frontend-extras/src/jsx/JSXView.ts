import { BackboneModel, Backbone, BackboneView, PluginContainer, TemplateContext } from 'sc-types-frontend';
import ReactLike from './ReactLike';

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
    this.supportsFunctionAttributes = this.supportsFunctionAttributes || this.options.supportsFunctionAttributes
    if (!this.preRenderPlugins) {
      this.preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
    }
    this.preRenderPlugins.install({
      name: 'jsx',
      execute($fragment, view) {
        if (isJSXView(view)) {
          const rendered = view.jsxTemplate(view.getContext());
          if (ReactLike.supportFunctionAttributes && view.supportsFunctionAttributes) {
            (rendered as any).__this = view
          }
          if (!view.options.dontEmptyContainer) {
            $fragment.empty()
          }
          ReactLike.renderJQuery($fragment, rendered)
        }
        return $fragment
      }
    })
  }

}

export interface JSXViewOptions<Model extends BackboneModel = BackboneModel> extends Backbone.ViewOptions<Model> {
  dontEmptyContainer?: boolean,
  supportsFunctionAttributes?: boolean
}

function isJSXView(view: any): view is JSXView<any, any> {
  return (view as any).jsxTemplate
}

export type JSXTemplate<Context extends TemplateContext> = (context: Context) => JSX.Element;
