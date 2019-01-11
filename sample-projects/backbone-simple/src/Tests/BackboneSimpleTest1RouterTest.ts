import { ModuleEntryPoint, Backbone, SCAUnitTestHelper, SCAUnitTestHelperPreconditions } from 'sc-types-frontend';

export default describe('Test1Router', () => {
  beforeEach(()=>{
    SCAUnitTestHelperPreconditions.setDefaultEnvironment()
    try {Backbone.history.start();}catch(ex){}
  })

  afterEach(function(){
    Backbone.history.navigate('', {trigger: false});
    try
    {
      Backbone.history.stop();
    }
    catch(e)
    {
      console.log(e);
    }
  });

  it('show View1 when navigating to page/$id', async done => {
    const helper = new SCAUnitTestHelper({
      startApplication: true,
      mountModules: [require<ModuleEntryPoint>('BackboneSimpleTest1')]
    })
    // Backbone.
    // const view = new BackboneSimpleTest1View()
    // const selector = '#main #layout #content .change'
    // expect(document.querySelector(selector)).toBeFalsy()
    // expect(jQuery(selector).length).toBe(0)

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

    // helper.application.getLayout().showContent(view)
    // helper.application.getLayout().$
    // expect(document.querySelector(selector)).toBeTruthy()
    // expect(jQuery(selector).length).toBe(1)
    done()
  })

})