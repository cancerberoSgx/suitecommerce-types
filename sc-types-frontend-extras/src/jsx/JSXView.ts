import { BackboneModel, BackboneView, PluginContainer, TemplateContext } from 'sc-types-frontend';
import ReactLike from './ReactLike';

export default class JSXView<Model extends BackboneModel, Context extends TemplateContext> extends BackboneView<Model, Context> {
  
  template = (...args: any[]) => `<div></div>`

  jsxTemplate: JSXTemplate<Context>

  supportsFunctionAttributes?: boolean = false
  
  initialize(options: any) {
    super.initialize(options)
    if (!this.preRenderPlugins) {
      this.preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
    }
    this.preRenderPlugins.install({
      name: 'jsx',
      execute($fragment, view) {
        if (isJSXView(view)) {
          const rendered = view.jsxTemplate(view.getContext());
          if(ReactLike.supportFunctionAttributes && view.supportsFunctionAttributes){            
            (rendered as any).__this = view
          }
          ReactLike.renderJQuery($fragment, rendered)
        }
        return $fragment
      }
    })
  }

}

function isJSXView(view: any): view is JSXView<any, any> {
  return (view as any).jsxTemplate
}

export type JSXTemplate<Context extends TemplateContext> = (context: Context) => JSX.Element;
