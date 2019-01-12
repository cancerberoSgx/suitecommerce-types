import { exec, rm, test, mkdir, config } from "shelljs";
import { readFileSync,  } from "fs";
import { expectCodeToContain, expectCodeNotToContain } from "../testUtil";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";

config.silent=true

describe('CLI bin', () => {

  it('minimum params should work', () => {
    const outputFolder =getPathRelativeToProjectFolder('tmp/foo1233')
    const tsconfig = getPathRelativeToProjectFolder('spec/fixtures/project1/tsconfig.json')
    rm('-rf', outputFolder)
    mkdir('-p', outputFolder)
    const cmd = `node bin/sc-tsc --tsconfigFilePath ${tsconfig} --outputFolder ${outputFolder} --addTslibJsInFolder ${outputFolder}/src`
    const p = exec(cmd)
    expect(p.code).toBe(0)
    expect(test('-f',`${outputFolder}/src/FrontEndSimpleEntry.js`)).toBe(true)
    expect(test(`-f`,`${outputFolder}/src/tslib.js`)).toBe(true)

    const aFile = readFileSync(`${outputFolder}/src/FrontEndSimpleView2.js`).toString()
    expectCodeToContain(aFile, `
    define('FrontEndSimpleView2', ['frontend_simple1_listview.tpl', 'Backbone.View', 'Backbone.Model', "tslib"], function (template, BackboneView, BackboneModel, tslib_1) {
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
            customValidation: function (e) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.model.fetch()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.render()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, this.model.get('validation')];
                        }
                    });
                });
            }
        });
    });
    
        `)
    expectCodeNotToContain(aFile, `require("tslib")`)

  })

  xit('error on incorrect params or non existing project', ()=>{

  })

  xit('test all params combinations', ()=>{
    
  })

})

