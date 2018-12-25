
export default describe('Deferred', () => {
  it('its a promise', async done => {
    async function f(): Promise<number>{
      return 2
    }
    expect(await f()).toBe(2)
    function g(): Promise<number>{
      return jQuery.Deferred().resolve(2).promise()
    }
    expect(await g()).toBe(2)
    done()
  })
})