import { JSXView } from 'sc-types-frontend-extras'
import { BackboneModel, TemplateContext, BackboneView } from 'sc-types-frontend';
export default class extends JSXView<BackboneModel, TemplateContext> {
  child = new BackboneView()
}