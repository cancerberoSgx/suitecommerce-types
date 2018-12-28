import {  BackboneView ,  BackboneModel} from 'sc-types-frontend'

define('FrontEndSimple1.ListView', 
['frontend_simple1_listview.tpl', 'Backbone'], (template, Backbone) => {

    const result = BackboneView.extend({
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
        customValidation: async function(e:MouseEvent): Promise<boolean>{
            await this.model.fetch()
            await this.render()
            return this.model.get('validation')
        }
    })
    return result
})

export interface Simple1ListViewContext {
    foo: number
}

export interface Simple1ListView extends BackboneView<BackboneModel, Simple1ListViewContext >{
    customValidation(e?:MouseEvent): Promise<boolean>
}