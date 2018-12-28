import  ReactLike from '../JavaScript/ReactLike';
import  Main from '../JavaScript/Main';
import {jQuery} from 'sc-types-frontend'
import CoolFeature56MainView from '../JavaScript/CoolFeature56MainView';

export default describe('CoolFeature view', ()=>{
  it('should render', async done =>{
    expect(document.querySelector('.jojojo')).toBeFalsy()
    expect( jQuery('.jojojo').length).toBe(0)

    debugger

    const view = new CoolFeature56MainView()
    view.$el = jQuery('body')
    view.render()

    // ReactLike.renderDOM(document.body, Main)
    expect(document.querySelector('.jojojo')).toBeTruthy()
    const c = jQuery('.jojojo')
   expect( c.length).toBe(1)
    done()
  })
})