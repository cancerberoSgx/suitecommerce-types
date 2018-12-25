import { addTslibAmdDependency } from "../../src/fixAmdTslib/addTslibAmdDependency";

describe('addTslibAmdDependency', () => {
    it('basic', () => {
        const inputCode = `
"use strict";
define('FrontEndSimple1.ListView', ['frontend_simple1_listview.tpl', 'Backbone'], function (template, Backbone) {
   return 1 
});
                `
        const result = addTslibAmdDependency({
            inputCode, 
            variableName: 'tslib_1'
        })
        // console.log(result.outputCode);
        expect(result.errors).toEqual([])
        expect(result.outputCode).toContain(`function (template, Backbone, tslib_1) {`)
        expect(result.outputCode).toContain(`['frontend_simple1_listview.tpl', 'Backbone', "tslib"]`)

    })
})