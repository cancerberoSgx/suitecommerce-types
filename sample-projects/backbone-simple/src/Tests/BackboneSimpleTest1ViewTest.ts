import { jQuery, SCAUnitTestHelper, SCAUnitTestHelperPreconditions, ModuleEntryPoint } from 'sc-types-frontend';
import BackboneSimpleTest1View from '../JavaScript/BackboneSimpleTest1View';

export default describe('Test1View', () => {
  beforeEach(()=>{
    SCAUnitTestHelperPreconditions.setDefaultEnvironment()
  })
  it('should render alone', async done => {
    const selector = '.change'
    expect(document.querySelector(selector)).toBeFalsy()
    expect(jQuery(selector).length).toBe(0)
    const view = new BackboneSimpleTest1View()
    view.$el = jQuery('<div style="display: none"></div>').appendTo('body')
    view.render()
    expect(document.querySelector(selector)).toBeTruthy()
    expect(jQuery(selector).length).toBe(1)
    done()
  })

  it('should render in an application\'s layout', async done => {

    // heads up we know the module is loaded locally with --addExtraAmdDependendenciesForSCAUnitTests - since these tests run locally
    const DebugTemplateNamePluginModule = require<ModuleEntryPoint>('Backbone.View.Plugin.DebugTemplateName')

    const helper = new SCAUnitTestHelper({
      startApplication: true,
      mountModules: [DebugTemplateNamePluginModule]
    })
    const view = new BackboneSimpleTest1View()

    const selector = '#main #layout #content .change'
    expect(document.querySelector(selector)).toBeFalsy()
    expect(jQuery(selector).length).toBe(0)

    // testing Layout events typings
    helper.application.getLayout().on('afterAppendToDom', layout=>{
      console.log('layout afterAppendToDom args', layout, layout.getCurrentView().template.Name)
    })
    helper.application.getLayout().on('beforeAppendToDom', layout=>{
      console.log('layout beforeAppendToDom args', layout, layout.getCurrentView().template.Name)
    })
    helper.application.getLayout().on('afterViewRender',view=>{
      console.log('layout afterViewRender', view, view.template.Name)
    })
    helper.application.getLayout().on('beforeAppendView', view=>{
      console.log('layout beforeAppendView args', view, view.template.Name)
    })
    helper.application.getLayout().on('afterAppendView', view=>{
      console.log('layout afterAppendView args', view, view.template.Name)
    })

    helper.application.getLayout().showContent(view)
    helper.application.getLayout().$
    expect(document.querySelector(selector)).toBeTruthy()
    expect(jQuery(selector).length).toBe(1)
    done()
  })

})