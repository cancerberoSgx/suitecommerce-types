import  ReactLike  from '../JavaScript/ReactLike';
import  Main from '../JavaScript/Main';
import {jQuery} from 'sc-types-frontend'

export  default describe('foo', ()=>{
  it('should', async done =>{
    expect(document.querySelector('.unique-unique123')).toBeFalsy()
    expect( jQuery('.unique-unique123').length).toBe(0)
    ReactLike.renderDOM(document.body, Main)
    expect(document.querySelector('.unique-unique123')).toBeTruthy()
   expect( jQuery('.unique-unique123').length).toBe(1)
    done()
  })
})