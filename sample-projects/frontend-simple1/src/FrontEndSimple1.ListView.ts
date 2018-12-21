import { ViewConstructor, Template , View, BackboneType, Model} from 'sc-types-frontend'

define<ViewConstructor<Simple1ListView>, [Template, BackboneType]>('FrontEndSimple1.ListView', 
['frontend_simple1_listview.tpl', 'Backbone'], (template, Backbone) => {

    const result = Backbone.View.extend<Simple1ListView>({
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
    return result
})

export interface Simple1ListViewContext {
    foo: number
}

export interface Simple1ListView extends View<Simple1ListViewContext, Model>{
    customValidation(e?:MouseEvent): Promise<boolean>
    model:Model
}