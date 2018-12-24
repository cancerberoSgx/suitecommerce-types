import { exec, rm, test } from "shelljs";
import { readFileSync } from "fs";
import { expectCodeToContain, expectCodeNotToContain } from "../testUtil";


describe('bin', () => {
  it('minimun params', () => {
    rm('-rf', 'dist/foo1233')
    const cmd = `sc-tsc --tsconfigFilePath spec/fixtures/project1/tsconfig.json  --outputFolder dist/foo1233 --debug --addTslibJsInFolder src`
    const p = exec(cmd)
    expect(p.code).toBe(0)
    expect(test('-f','dist/foo1233/src/FrontEndSimpleEntry.js')).toBe(true)
    expect(test('-f','dist/foo1233/src/tslib.js')).toBe(true)

    const aFile = readFileSync(`dist/foo1233/src/FrontEndSimpleView2.js`).toString()
    expectCodeToContain(aFile, `
Object.defineProperty(exports, "__esModule", { value: true });
define('FrontEndView2', ['frontend_simple1_listview.tpl', 'Backbone.View', 'Backbone.Model', "tslib"], function (template, BackboneView, BackboneModel, tslib_1) {
    return BackboneView.extend({
        template: template,
        events: {
            '[data-action="validate"]': 'customValidation'
        },
        getContext: function () {
            return {
                foo: 1
            };
        },
        model: new BackboneModel(),
        `)
    expectCodeNotToContain(aFile, `require("tslib")`)

  })

  xit('error on incorrect params or non existing project', ()=>{

  })

  xit('test all params combinations', ()=>{
    
  })

})

