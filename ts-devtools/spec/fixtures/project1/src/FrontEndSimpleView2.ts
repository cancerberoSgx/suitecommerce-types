import template from './frontend_simple1_listview.tpl'
import { BackboneView, BackboneModel } from 'sc-types-frontend';

export const FrontEndView2 = BackboneView.extend({
  template,
  events:{
      '[data-action="validate"]': 'customValidation'
  },
  getContext() {
      return {
          foo: 1
      }
  },
  model: new BackboneModel(),
  async customValidation(e:MouseEvent): Promise<boolean>{
      await this.model.fetch()
      await this.render()
      return this.model.get('validation')
  }
})

export interface Simple1ListViewContext {
    foo: number
}

// export interface Simple1ListView extends BackboneView{
//     customValidation(e?:MouseEvent): Promise<boolean>
// }