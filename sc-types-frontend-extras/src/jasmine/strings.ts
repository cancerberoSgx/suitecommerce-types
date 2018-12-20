// jasmine spec helpers for views, apps and modules

export default  {
  expectTextEquals(a?: string, b?: string, debug=false) {
    !debug && console.log(a, b);
    if(!a||!b)return false
    expect(a.replace(/\s+/gm, ' ').trim()).toEqual(b.replace(/\s+/gm, ' ').trim())
  }, 
  expectTextToContain(a?: string, b?: string, debug=false) {
    !debug && console.log(a, b);  
    if(!a||!b)return false
    expect(a.replace(/\s+/gm, ' ').trim()).toContain(b.replace(/\s+/gm, ' ').trim())
  }, 
  expectTextNotToContain(a?: string, b?: string, debug=false) {
    !debug && console.log(a, b);
    if(!a||!b)return false
    expect(a.replace(/\s+/gm, ' ').trim()).not.toContain(b.replace(/\s+/gm, ' ').trim())
  }
}