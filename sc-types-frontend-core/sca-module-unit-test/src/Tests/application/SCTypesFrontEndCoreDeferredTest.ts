import { Deferred, jQuery } from 'sc-types-frontend';

export default describe('Deferred', () => {
  it('supports await async', async done => {
    async function f(): Promise<number>{
      return 2
    }
    expect(await f()).toBe(2)
    function g(): Promise<number>{
      const d = jQuery.Deferred<number>().resolve(3)
      return d.promise()
    }
    expect(await g()).toBe(3)
    function h(): Deferred<number>{
      return jQuery.Deferred().resolve(4)
    }
    expect(await h()).toBe(4)
    const v4=await h()
    // debugger
    done()
  })
})