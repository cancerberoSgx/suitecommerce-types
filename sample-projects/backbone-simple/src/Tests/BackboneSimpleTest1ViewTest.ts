import { jQuery, SCAUnitTestHelper, SCAUnitTestHelperPreconditions } from 'sc-types-frontend';
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
    const helper = new SCAUnitTestHelper({
      startApplication: true
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