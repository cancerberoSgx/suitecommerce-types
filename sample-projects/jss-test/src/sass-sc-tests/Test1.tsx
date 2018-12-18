import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike } from 'sc-types-frontend-extras';

interface Context1 extends TemplateContext {
  persons: {name: string}[]
}

class ViewWithEventAttributesReferencingThisDontWork extends JSXView<BackboneModel, Context1> {

  supportsFunctionAttributes = true

  jsxTemplate = (context: Context1) => <div>
    <button></button>
  </div>
}