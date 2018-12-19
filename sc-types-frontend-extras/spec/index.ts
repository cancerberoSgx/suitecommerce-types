
import { JSDOM } from 'jsdom';
import { ls } from 'shelljs';

declare const global: any
function installJsDom() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://my.home.com/'
  })
  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = dom.window.navigator;
  global.Image = global.window.Image
  global.MouseEvent = global.window.MouseEvent
  global.$ = global.jQuery = require('jquery');
  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property]
    }
  })
}
installJsDom()


function runJasmine() {
  const Jasmine = require('jasmine')
  let specFiles = ls('-R', __dirname).map(f => `${__dirname}/${f}`).filter(f => f.endsWith('Spec.js') || ((f.endsWith('Spec.ts') || (f.endsWith('Spec.tsx')) && !f.endsWith('.d.ts'))))
  const jasmineRunner = new Jasmine()
  jasmineRunner.specFiles = specFiles
  jasmineRunner.execute()
}

runJasmine()