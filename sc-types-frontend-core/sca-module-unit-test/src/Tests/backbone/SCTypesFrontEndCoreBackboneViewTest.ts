import { jQuery, SCAUnitTestHelper, SCAUnitTestHelperPreconditions, ModuleEntryPoint } from 'sc-types-frontend';
import BackboneSimpleTest1View from '../../JavaScript/backbone/SCTypesFrontEndCoreView';

export default describe('sc-types-frontend-core Backbone.View', () => {
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

    helper.application.getLayout().showContent(view)
    expect(document.querySelector(selector)).toBeTruthy()
    expect(jQuery(selector).length).toBe(1)
    done()
  })

})