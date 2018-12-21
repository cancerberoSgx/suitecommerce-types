
import { ls } from 'shelljs';

declare const global: any

var JSDOM = require("jsdom").JSDOM
    const dom = new JSDOM('<html><head><head><body></body></html>', {
      url: 'http://foo.com',
      runScripts: "dangerously",
      resources: "usable"
    })
    var jQuery = require("jquery")(dom.window);

  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = dom.window.navigator;
  global.Image = global.window.Image
  global.MouseEvent = global.window.MouseEvent
  global.window.$ = global.window.jQuery = global.$ = global.jQuery = jQuery

// function installJsDom() {
//   const dom = new JSDOM('<html><head><head><body></body></html>', {
//     url: 'http://foo.com',
//     runScripts: "dangerously",
//     resources: "usable"
//   })
//   global.document = dom.window.document;
//   global.window = dom.window;
//   global.navigator = dom.window.navigator;
//   global.Image = global.window.Image
//   global.MouseEvent = global.window.MouseEvent
//   global.window.$ = global.window.jQuery = global.$ = global.jQuery = require('jquery')(global.window);
//   // global._ = require('underscore');
//   // global.Backbone  = require('backbone');
//   // Object.keys(document.defaultView).forEach((property) => {
//   //   if (typeof global[property] === 'undefined') {
//   //     global[property] = document.defaultView[property]
//   //   }
//   // })


//   // if(BackboneView.notInSc){
//   //   debugger
//   //   const stickit = require('./ported/backbone.stickit')
//   //   const   BackboneFormViewPartial =    require('./ported/BackboneFormViewPartial').default
//   //   debugger
//   //   Object.assign(BackboneFormView, BackboneFormViewPartial)
//   // }
// }

//   // if(BackboneView.notInSc){
// installJsDom()
//   // }

function runJasmine() {
  const Jasmine = require('jasmine')
  let specFiles = ls('-R', __dirname).map(f => `${__dirname}/${f}`).filter(f => f.endsWith('Spec.js') || ((f.endsWith('Spec.ts') || (f.endsWith('Spec.tsx')) && !f.endsWith('.d.ts'))))
  const jasmineRunner = new Jasmine()
  jasmineRunner.specFiles = specFiles
  jasmineRunner.execute()
}

runJasmine()