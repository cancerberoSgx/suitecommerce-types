import { ReactLike } from '../JavaScript/ReactLike';
import { Main } from '../JavaScript/Main';

export const MainTest = describe('foo', ()=>{
  it('should', async done =>{
    ReactLike.renderDOM(document.body, Main)
    expect(1).toBe(1)
    done()
  })
})