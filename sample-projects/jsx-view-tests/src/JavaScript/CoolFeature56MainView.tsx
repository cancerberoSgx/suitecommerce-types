import CoolFeature56MainViewTemplate, { CoolFeature56MainViewContext } from './CoolFeature56MainViewTemplate';
import CoolFeature56Model from './CoolFeature56Model';
import JSXView from './JSXView';
import { View, BackboneModel, underscore } from 'sc-types-frontend';

export default class extends JSXView<BackboneModel, CoolFeature56MainViewContext>{
  // jsxTemplate = (context: CoolFeature56MainViewContext) =><div>{context.name}</div>
  jsxTemplate = CoolFeature56MainViewTemplate
  events = {
    '[data-action="validate"]': 'customValidation',
    '[data-action="change"]': 'changed'
  } as any
  getContext(): CoolFeature56MainViewContext {
    return {...super.getContext()||{}, name: 'seba'}
  }
  model = new CoolFeature56Model()
  async customValidation(e?: MouseEvent): Promise<number> {
    const r = await this.model.fetch('')
    await this.render()
    return this.model.get('validation')+r
  }
  changed= underscore.throttle(e=>{}, 1000)
}



// export default interface IJSXView extends View<BackboneModel, CoolFeature56MainViewContext> {
  
// }