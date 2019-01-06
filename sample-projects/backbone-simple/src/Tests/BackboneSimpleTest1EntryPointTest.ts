import { jQuery } from 'sc-types-frontend';
import BackboneSimpleTest1View from '../JavaScript/BackboneSimpleTest1View';

export default describe('CoolFeature view', ()=>{
  it('should render', async done =>{
    expect(document.querySelector('.jojojo')).toBeFalsy()
    expect( jQuery('.jojojo').length).toBe(0)

    const view = new BackboneSimpleTest1View()
    view.$el = jQuery('body')
    view.render()

    // ReactLike.renderDOM(document.body, Main)
    expect(document.querySelector('.jojojo')).toBeTruthy()
    const c = jQuery('.jojojo')
   expect( c.length).toBe(1)
    done()
  })
})