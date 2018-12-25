import { fixJsFileAmdTslib } from "../../src/fixAmdTslib/fixJsFileAmdTslib";

describe('addTslibAmdDependency', () => {

    it('custom dependencyName and other variablename', () => { //failing
        const inputCode = `
var tslib_2 = require("tslib");
define('a', ['b'],function (b) { 
}) 
 `
        const result = fixJsFileAmdTslib({
            inputCode,
            tslibDependencyName: 'TsLibrary'
        })
        expect(result.errors).toEqual([])
        expect(result.outputCode).toContain(`define('a', ['b', "tslib"],function (b, tslib_2) { `)
    })

    it('real file', () => {
        const inputCode = `
"use strict";
var tslib_1 = require("tslib");
define('FrontEndSimple1.ListView', ['frontend_simple1_listview.tpl', 'Backbone'], function (template, Backbone) {
    var result = Backbone.View.extend({
        template: template,
        events: {
            '[data-action="validate"]': 'customValidation'
        },
        getContext: function () {
            return {
                foo: 1
            };
        },
        model: new Backbone.Model(),
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
    return result;
});
//# sourceMappingURL=FrontEndSimple1.ListView.js.map

                `
        const result = fixJsFileAmdTslib({
            inputCode
        })
        // console.log(result.outputCode);
        expect(result.errors).toEqual([])

        expect(result.variableName).toBe('tslib_1')
        expect(result.outputCode).not.toContain('var tslib_1')
        expect(result.outputCode).not.toContain('require("tslib")')

        expect(result.outputCode).toContain(`function (template, Backbone, tslib_1) {`)
        expect(result.outputCode).toContain(`['frontend_simple1_listview.tpl', 'Backbone', "tslib"]`)

    })



    xit('define with two args', () => {

    })

    xit('dependency names not literals', () => {

    })

    xit('empty dependency array', () => {

    })


    xit('not supported: dependency array from variable (must be literal)', () => {

    })


    xit('arrow', () => { //failing
        const inputCode = `
var tslib_2 = require("tslib");
define('a', ['b'], (template)=> {
}) 
`
        const result = fixJsFileAmdTslib({
            inputCode,
            // tslibDependencyName: 'TsLibrary'
        })
        // console.log(result.outputCode);
        expect(result.errors).toEqual([])

        // expect(result.variableName).toBe('tslib_1')
        // expect(result.outputCode).not.toContain('var tslib_1')
        // expect(result.outputCode).not.toContain('require("tslib")')

        // expect(result.outputCode).toContain(`function (template, Backbone, tslib_1) {`)
        // expect(result.outputCode).toContain(`['frontend_simple1_listview.tpl', 'Backbone', "tslib"]`)

    })

    xit(`require("tslib") but using other quotes`, () => { //fails
        const inputCode = `
    var tslib_2 = require('tslib');
    define('a', ['b'], (template)=> {
    }) 
     `
        const result = fixJsFileAmdTslib({
            inputCode,
            tslibDependencyName: 'TsLibrary'
        })
        // console.log(result.outputCode);
        expect(result.errors).toEqual([])
    })

})