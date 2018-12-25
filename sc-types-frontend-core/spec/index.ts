// Be able to run individual specs (without having to comment all the others). Examples:
//
// $ node spec cliApiSpec
// $ node spec cliApiSpec,nodeApiSpec


declare const global: any

import {JSDOM} from 'jsdom';
import { ls } from 'shelljs';
const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
// global.window.document=document
global.navigator = dom.window.navigator;
const $ = global.jQuery = require( 'jquery' );


const path = require('path')
const Jasmine = require('jasmine')


let specFiles = ls(__dirname).map(f=>`${__dirname}/${f}`).filter(f=>f.endsWith('.js'))


const jasmineRunner = new Jasmine()
jasmineRunner.specFiles = specFiles
jasmineRunner.execute()

