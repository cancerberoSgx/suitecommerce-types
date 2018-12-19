
import {JSDOM} from 'jsdom';
import { ls } from 'shelljs';

declare const global: any
function installJsDom(){
  const dom = new JSDOM('<html><body></body></html>');
  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = dom.window.navigator;
  global.$ = global.jQuery = require( 'jquery' );
}

function runJasmine(){
  const Jasmine = require('jasmine')
  let specFiles = ls('-R', __dirname).map(f=>`${__dirname}/${f}`).filter(f=>f.endsWith('Spec.js')||((f.endsWith('Spec.ts')||(f.endsWith('Spec.tsx'))&&!f.endsWith('.d.ts'))))
  const jasmineRunner = new Jasmine()
  jasmineRunner.specFiles = specFiles
  jasmineRunner.execute()
}

installJsDom()
runJasmine()