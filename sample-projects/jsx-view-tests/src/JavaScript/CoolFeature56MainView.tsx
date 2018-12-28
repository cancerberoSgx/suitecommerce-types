import CoolFeature56MainViewTemplate, { CoolFeature56MainViewContext } from './CoolFeature56MainViewTemplate';
import CoolFeature56Model from './CoolFeature56Model';
import JSXView from './JSXView';

export default class extends JSXView<CoolFeature56Model, CoolFeature56MainViewContext>{
  // jsxTemplate = (context: CoolFeature56MainViewContext) =><div>{context.name}</div>
  jsxTemplate = CoolFeature56MainViewTemplate
  events = {
    '[data-action="validate"]': 'customValidation'
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
}

