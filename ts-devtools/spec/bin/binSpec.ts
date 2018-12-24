import { exec, rm, test } from "shelljs";
import { readFileSync } from "fs";
import { expectCodeToContain, expectCodeNotToContain } from "../testUtil";


describe('bin', () => {
  it('minimun params', () => {
    rm('-rf', 'dist/foo1233')
    const cmd = `sc-tsc --tsconfigFilePath spec/fixtures/project1/tsconfig.json  --outputFolder dist/foo1233 --debug --addTslibJsInFolder dist/foo1233/src`
    const p = exec(cmd)
    expect(p.code).toBe(0)
    expect(test('-f','dist/foo1233/src/FrontEndSimpleEntry.js')).toBe(true)
    expect(test('-f','dist/foo1233/src/tslib.js')).toBe(true)

    const aFile = readFileSync(`dist/foo1233/src/FrontEndSimple1.ListView.js`).toString()
    expectCodeToContain(aFile, `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
define('FrontEndSimple1ListView', ['frontend_simple1_listview.tpl', "tslib"], function (template, tslib_1) {
    var Backbone = null;
        `)
    expectCodeNotToContain(aFile, `require("tslib")`)

  })

  xit('error on incorrect params or non existing project', ()=>{

  })

  xit('test all params combinations', ()=>{
    
  })

})

