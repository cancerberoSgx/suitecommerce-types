import { removeVariableDeclaration } from "../../src/fixAmdTslib/removeVariableDeclaration";
describe('removeVariableDeclaration', () => {
    it('basic', () => {
        const inputCode = `
"use strict";
var tslib_1 = require("tslib");
define('FrontEndSimple1.ListView', ['frontend_simple1_listview.tpl', 'Backbone'], function (template, Backbone) {
   return 1 
});
                `
        const result = removeVariableDeclaration({
            inputCode
        })
        expect(result.errors).toEqual([])
        expect(result.variableName).toBe('tslib_1')
        expect(result.outputCode).not.toContain('var tslib_1')
        expect(result.outputCode).not.toContain('require("tslib")')

    })
})