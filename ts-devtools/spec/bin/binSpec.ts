import { exec, rm, test, mkdir } from "shelljs";
import { readFileSync,  } from "fs";
import { expectCodeToContain, expectCodeNotToContain } from "../testUtil";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";


describe('CLI bin', () => {

  it('minimun params should work', () => {
    const outputFolder =getPathRelativeToProjectFolder('tmp/foo1233')
    const tsconfig = getPathRelativeToProjectFolder('spec/fixtures/project1/tsconfig.json')
    rm('-rf', outputFolder)
    mkdir('-p', outputFolder)
    const cmd = `node bin/sc-tsc --tsconfigFilePath ${tsconfig} --outputFolder ${outputFolder} --debug --addTslibJsInFolder src`
    const p = exec(cmd)
    expect(p.code).toBe(0)
    expect(test('-f',`${outputFolder}/src/FrontEndSimpleEntry.js`)).toBe(true)
    expect(test(`-f`,`${outputFolder}/src/tslib.js`)).toBe(true)

    const aFile = readFileSync(`${outputFolder}/src/FrontEndSimpleView2.js`).toString()
    expectCodeToContain(aFile, `
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

