
// import { JSDOM } from 'jsdom';
import { ls, mv } from 'shelljs';
// import * as Jasmine from 'jasmine'
const Jasmine = require('jasmine')
// mv('node_modules/puppeteer2', 'node_modules/puppeteer')
let specFiles = ls( __dirname).map(f => `${__dirname}/${f}`).filter(f => f.endsWith('Spec.js') || ((f.endsWith('Spec.ts') || (f.endsWith('Spec.tsx')) && !f.endsWith('.d.ts'))))
const jasmineRunner = new Jasmine()
jasmineRunner.specFiles = specFiles
jasmineRunner.execute()
  
