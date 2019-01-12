import {jQuery, BackboneModel, TemplateContext} from 'sc-types-frontend'
import {JSXView, ReactLike} from 'sc-types-frontend-extras'

export default describe('JSXView', ()=>{

  class Model1 extends BackboneModel {

  }
  interface Context1 extends TemplateContext {
    name: string
  }

  class View1 extends JSXView<Model1, Context1> {
    jsxTemplate = context => <div className="view1">Name: {context.name}</div>
  }

  fit('should render', async done =>{
    const selector = '.view1'
    expect(document.querySelector(selector)).toBeFalsy()
    const view1 = new View1()
    view1.$el = jQuery('<div></div>').appendTo('body')
    view1.render()
    expect(document.querySelector(selector)).toBeTruthy()
    done()
  })
})