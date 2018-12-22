import { addTslibAmdDependency } from "../src/addTslibAmdDependency";

describe('addTslibAmdDependency', () => {
    it('basic', () => {
        const inputCode = `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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