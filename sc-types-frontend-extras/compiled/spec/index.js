"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var shelljs_1 = require("shelljs");
function installJsDom() {
    var dom = new jsdom_1.JSDOM('<html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
    global.navigator = dom.window.navigator;
    global.$ = global.jQuery = require('jquery');
}
function runJasmine() {
    var Jasmine = require('jasmine');
    var specFiles = shelljs_1.ls('-R', __dirname).map(function (f) { return __dirname + "/" + f; }).filter(function (f) { return f.endsWith('Spec.js') || (f.endsWith('Spec.ts') && !f.endsWith('.d.ts')); });
    var jasmineRunner = new Jasmine();
    jasmineRunner.specFiles = specFiles;
    jasmineRunner.execute();
}
installJsDom();
runJasmine();
