import { Backbone } from 'suitecommerce'
import { template } from './frontend_simple1_listview.tpl'


export const FrontEndSimple1ListView = Backbone.View.extend<Simple1ListView>({
  template,
  events:{
      '[data-action="validate"]': 'customValidation'
  },
  getContext() {
      return {
          foo: 1
      }
  },
  model: new Backbone.Model(),
  async customValidation(e:MouseEvent): Promise<boolean>{
      await this.model.fetch()
      await this.render()
      return this.model.get('validation')
  }
})

export interface Simple1ListViewContext {
    foo: number
}

export interface Simple1ListView extends View<Simple1ListViewContext, Model>{
    customValidation(e?:MouseEvent): Promise<boolean>
    model:Model
}