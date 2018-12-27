import { TemplateContext, BackboneView, BackboneModel, PluginContainer, Plugin } from 'sc-types-frontend';
import { ReactLike } from './ReactLike';
import { JSXTemplate } from './JSXTemplate';

// {
//     name: 'jsx', 
// }
// const plugin: Plugin<JQuery<HTMLElement>, [BackboneView]> = {
//     name: 'jsx',
//     execute($fragment, view){
//     $fragment.empty().append(this.jsxTemplate(this.getContext()))
//     return $fragment
//     }
// }
export class JSXView<Model extends BackboneModel, Context extends TemplateContext> extends BackboneView<Model, Context> {
  template = (...args: any[]) => ''
  jsxTemplate: JSXTemplate<Context>
  // preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
  initialize(options: any) {
    super.initialize(options)
    if (!this.preRenderPlugins) {
      this.preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
    }
    this.preRenderPlugins.install({
      name: 'jsx',
      execute($fragment, view) {
        if (isJSXView(view)) {
          ReactLike.renderDOM($fragment.get(0), view.jsxTemplate(view.getContext()))
          // $fragment.empty().append(view.jsxTemplate(this.getContext()))

        }
        return $fragment
      }
    })
  }
}
export function isJSXView(view: any): view is JSXView<any, any> {
  return (view as any).jsxTemplate
}
// BackboneView.preRender.install()
// BackboneView.postCompile