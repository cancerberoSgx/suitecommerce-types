import { ReactLike } from '../JavaScript/ReactLike';
import { Main } from '../JavaScript/Main';
import {jQuery} from 'sc-types-frontend'

export const MainTest = describe('foo', ()=>{
  it('should', async done =>{
    expect(document.querySelector('.unique-unique123')).toBeFalsy()
    expect( jQuery('.unique-unique123').length).toBe(0)
    ReactLike.renderDOM(document.body, Main)
    expect(document.querySelector('.unique-unique123')).toBeTruthy()
    const c = jQuery('.unique-unique123')
   expect( c.length).toBe(1)
    done()
  })
})