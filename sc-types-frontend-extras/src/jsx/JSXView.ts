import { BackboneModel, BackboneView, PluginContainer, TemplateContext } from 'sc-types-frontend';
import { JSXTemplate } from './JSXTemplate';
import ReactLike from './ReactLike';

export default class JSXView<Model extends BackboneModel, Context extends TemplateContext> extends BackboneView<Model, Context> {
  template = (...args: any[]) => `<div></div>`
  jsxTemplate: JSXTemplate<Context>
  initialize(options: any) {
    super.initialize(options)
    if (!this.preRenderPlugins) {
      this.preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
    }
    this.preRenderPlugins.install({
      name: 'jsx',
      execute($fragment, view) {
        if (isJSXView(view)) {
          ReactLike.renderJQuery($fragment, view.jsxTemplate(view.getContext()))
        }
        return $fragment
      }
    })
  }
}

function isJSXView(view: any): view is JSXView<any, any> {
  return (view as any).jsxTemplate
}
