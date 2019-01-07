import template from 'backbone_simple_test1_list_view.tpl'
import { BackboneCollection, BackboneModel, BackboneView, TemplateContext } from 'sc-types-frontend'
import BackboneSimpleTest1Collection from './BackboneSimpleTest1Collection'

export default class extends BackboneView<BackboneModel, ViewContext> {

  template = template

  events() {
    return {
      'click .add': this.add.bind(this)
    }
  }

  initialize(options?) {
    super.initialize(options)
    this.collection = new BackboneSimpleTest1Collection()
    this.collection.on('add remove', this.render.bind(this))
  }

  add(e: JQuery.TriggeredEvent<any, any, any, HTMLButtonElement>) {
    const input = this.$('.toAdd') as JQuery<HTMLInputElement>
    this.collection.add(new BackboneModel({ value: input.val() }))
  }

  getContext(): ViewContext {
    return {
      collection: this.collection
    }
  }

}

export interface ViewContext extends TemplateContext {
  collection: BackboneCollection<BackboneModel>
}
