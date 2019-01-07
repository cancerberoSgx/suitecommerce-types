import template from 'backbone_simple_test1_view.tpl'
import { BackboneView, TemplateContext } from 'sc-types-frontend'
import BackboneSimpleTest1Model from './BackboneSimpleTest1Model'

export default class extends BackboneView<BackboneSimpleTest1Model, ViewContext> {

  template = template

  events() {
    return {
      'keyup .change': this.change.bind(this)
    }
  }

  initialize(options?) {
    super.initialize(options)
    this.model = new BackboneSimpleTest1Model()
    this.model.set('value', 'foo')
    this.model.on('change', this.render.bind(this))
  }

  change(e: JQuery.TriggeredEvent<any, any, any, HTMLButtonElement>) {
      this.model.set('value', e.target.value)
  }

  getContext(): ViewContext {
    return {
      value: this.model.get('value')
    }
  }
}

export interface ViewContext extends TemplateContext {
  people?: Person[]
  value: string
}

export interface Person {
  name: string
  age: number
}