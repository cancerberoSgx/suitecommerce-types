import { BackboneModel, BackboneView } from "sc-types-frontend";
import { CoolFeature56Model } from './CoolFeature56Model';
import { JSXView } from './JSXView';
import { ReactLike } from './ReactLike'
import { CoolFeature56MainViewContext } from './CoolFeature56MainViewContext';

export class CoolFeature56MainView extends JSXView<CoolFeature56Model, CoolFeature56MainViewContext>{
  // template = () => ''
  jsxTemplate = (context: CoolFeature56MainViewContext) =><div>{context.name}</div>
  events = {
    '[data-action="validate"]': 'customValidation'
  } as any
  // @overr
  getContext(): CoolFeature56MainViewContext {
    return {...super.getContext()||{}, name: 'seba'}
  }
  // initi
  model = new CoolFeature56Model()
  async customValidation(e?: MouseEvent): Promise<number> {
    const r = await this.model.fetch('')
    await this.render()
    return this.model.get('validation')+r
  }
}