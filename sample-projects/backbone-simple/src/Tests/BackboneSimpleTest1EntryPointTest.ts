import { jQuery } from 'sc-types-frontend';
import BackboneSimpleTest1View from '../JavaScript/BackboneSimpleTest1View';

export default describe('CoolFeature view', ()=>{
  it('should render', async done =>{
    const selector = '.change'
    expect(document.querySelector(selector)).toBeFalsy()
    expect( jQuery(selector).length).toBe(0)
    const view = new BackboneSimpleTest1View()
    view.$el = jQuery('body')
    view.render()
    expect(document.querySelector(selector)).toBeTruthy()
    const c = jQuery(selector)
   expect( c.length).toBe(1)
    done()
  })
})