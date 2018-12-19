// import { BackboneModel, Backbone, BackboneView, PluginContainer, TemplateContext, ModelAttributes } from 'sc-types-frontend';
// import ReactLike from './ReactLike';
// import JSXView, { JSXViewOptions } from './JSXView';
// import { TypedBackboneModel } from '../model';

// /**
//  * I'm a BackboneView that supports JSX templates with attribute `jsxTemplate` instead of the normal `template` one. 
//  * 
//  * I'm not a react-like component, I just render `jsxTemplate` and that's it, all the other logic like events, model, binding, etc is implemented by the normal BackboneView technologies. 
//  * 
//  * Optionally, if `ReactLike.supportFunctionAttributes && view.supportsFunctionAttributes` I have partial support for function attributes (like event handlers). 
//  * 
//  */
// export default class JSXViewWithState<Model extends BackboneModel = BackboneModel, Context extends TemplateContext = TemplateContext> extends JSXView<Model, Context> {

//   protected state!: State//TypedBackboneModel<State>

//   // initialize(options?: JSXViewWithStateOptions<Model>) {
//   //   super.initialize(options as any)
//   // }

//   protected options: JSXViewWithStateOptions<Model> = {}

//   setState(state: State) {
//     // if (!this.state) {
//     //   this.state = state//new TypedBackboneModel<State>()
//     //   // if(!this.options.dontRenderAutomatically) {
//     //   //   this.state.on('change', this.render.bind(this))
//     //   // }
//     // }
//     // this.state.setAttributes(state)
//     this.state = 
//     if(!this.options.dontRenderAutomatically){
//       this.render()
//     }
//   }
// }

// export interface JSXViewWithStateOptions<Model extends BackboneModel = BackboneModel> extends JSXViewOptions<Model>{
//   dontRenderAutomatically?: boolean
// }