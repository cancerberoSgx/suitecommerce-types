import template from './frontend_simple1_listview.tpl'
import { View , BackboneModel, BackboneView} from 'sc-types-frontend';

export const FrontEndSimple1ListView = BackboneView.extend({
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

export interface Simple1ListView extends View{
    customValidation(e?:MouseEvent): Promise<boolean>
}

// const v=new FrontEndSimple1ListView() // this is currently failing
const v=1234