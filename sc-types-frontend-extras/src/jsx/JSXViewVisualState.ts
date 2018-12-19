import { BackboneModel, Backbone, BackboneView, PluginContainer, TemplateContext, ModelAttributes } from 'sc-types-frontend';
import ReactLike from './ReactLike';
import { JSXViewOptions } from './JSXView';
import { TypedBackboneModel } from '../model';

/**
 * I'm a BackboneView that supports JSX templates with attribute `jsxTemplate` instead of the normal `template` one. 
 * 
 * I'm not a react-like component, I just render `jsxTemplate` and that's it, all the other logic like events, model, binding, etc is implemented by the normal BackboneView technologies. 
 * 
 * Optionally, if `ReactLike.supportFunctionAttributes && view.supportsFunctionAttributes` I have partial support for function attributes (like event handlers). 
 */
export default class JSXViewWithState<Model extends BackboneModel = BackboneModel, Context extends TemplateContext = TemplateContext, State extends ModelAttributes = {}> extends BackboneView<Model, Context> {

  private state!: TypedBackboneModel<State>

  initialize(options?: JSXViewOptions<Model>) {
    super.initialize(options as any)
  }

  setState(state: State) {
    if (!this.state) {
      this.state = new TypedBackboneModel<State>()
    }
    this.state.setAttributes(state)
  }


}