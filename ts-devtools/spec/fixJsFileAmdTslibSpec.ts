import { fixJsFileAmdTslib } from "../src/fixJsFileAmdTslib";

describe('addTslibAmdDependency', () => {
    fit('basic', () => {
        const inputCode = `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log(result.outputCode);
        expect(result.errors).toEqual([])

        expect(result.variableName).toBe('tslib_1')
        expect(result.outputCode).not.toContain('var tslib_1')
        expect(result.outputCode).not.toContain('require("tslib")')

        expect(result.outputCode).toContain(`function (template, Backbone, tslib_1) {`)
        expect(result.outputCode).toContain(`['frontend_simple1_listview.tpl', 'Backbone', "tslib"]`)

    })
})