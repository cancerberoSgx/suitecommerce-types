// import { Deferred } from "../../src";
import {jQuery, Deferred} from 'sc-types-frontend'

export const DeferredSpec =  describe('Deferred', () => {
  it('supports await async', async done => {
    async function f(): Promise<number>{
      return 2
    }
    expect(await f()).toBe(2)
    // function g(): Promise<number>{
    //   return jQuery.Deferred().resolve(3)
    // }
    // expect(await g()).toBe(3)
    function h(): Deferred<number>{
      return jQuery.Deferred().resolve(4)
    }
    expect(await h()).toBe(4)
    const v4=await h()
    debugger
    done()
  })
})