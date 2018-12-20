describe('empty', () => {
  it('creating a new jsdom and loading jquery', () => {
    var JSDOM = require("jsdom").JSDOM
    const dom = new JSDOM('<html><head><head><body></body></html>', {
      url: 'http://foo.com',
      runScripts: "dangerously",
      resources: "usable"
    })
    var j = require("jquery")(dom.window);
    j('<p>asdasd</p>').appendTo('body')
    expect(j('body').html()).toBe('<p>asdasd</p>')
  })

  it('Using global jQUery creatnig in spec/index.ts', () => {
    jQuery('body').empty()
    expect(jQuery('body').html()).toBe('')
    var html = `<p>asdasd</p>`
    jQuery(html).appendTo('body')
    expect(jQuery('body').html()).toBe(html)
  })
})