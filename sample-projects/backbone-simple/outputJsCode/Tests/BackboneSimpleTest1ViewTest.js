"use strict";

define('BackboneSimpleTest1ViewTest', ['jQuery', 'UnitTestHelper', 'UnitTestHelper.Preconditions', 'BackboneSimpleTest1View', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(jQuery, SCAUnitTestHelper, SCAUnitTestHelperPreconditions, BackboneSimpleTest1View, tslib_1) {
    var _this = this;
    return describe('Test1View', function() {
        beforeEach(function() {
            SCAUnitTestHelperPreconditions.setDefaultEnvironment();
        });
        it('should render alone', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var selector, view;
                return tslib_1.__generator(this, function(_a) {
                    selector = '.change';
                    expect(document.querySelector(selector)).toBeFalsy();
                    expect(jQuery(selector).length).toBe(0);
                    view = new BackboneSimpleTest1View();
                    view.$el = jQuery('<div style="display: none"></div>').appendTo('body');
                    view.render();
                    expect(document.querySelector(selector)).toBeTruthy();
                    expect(jQuery(selector).length).toBe(1);
                    done();
                    return [2 /*return*/];
                });
            });
        });
        it('should render in an application\'s layout', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var DebugTemplateNamePluginModule, helper, view, selector;
                return tslib_1.__generator(this, function(_a) {
                    DebugTemplateNamePluginModule = require('Backbone.View.Plugin.DebugTemplateName');
                    helper = new SCAUnitTestHelper({
                        startApplication: true,
                        mountModules: [DebugTemplateNamePluginModule]
                    });
                    view = new BackboneSimpleTest1View();
                    selector = '#main #layout #content .change';
                    expect(document.querySelector(selector)).toBeFalsy();
                    expect(jQuery(selector).length).toBe(0);
                    // testing Layout events typings
                    helper.application.getLayout().on('afterAppendToDom', function(layout) {
                        console.log('layout afterAppendToDom args', layout, layout.getCurrentView().template.Name);
                    });
                    helper.application.getLayout().on('beforeAppendToDom', function(layout) {
                        console.log('layout beforeAppendToDom args', layout, layout.getCurrentView().template.Name);
                    });
                    helper.application.getLayout().on('afterViewRender', function(view) {
                        console.log('layout afterViewRender', view, view.template.Name);
                    });
                    helper.application.getLayout().on('beforeAppendView', function(view) {
                        console.log('layout beforeAppendView args', view, view.template.Name);
                    });
                    helper.application.getLayout().on('afterAppendView', function(view) {
                        console.log('layout afterAppendView args', view, view.template.Name);
                    });
                    helper.application.getLayout().showContent(view);
                    helper.application.getLayout().$;
                    expect(document.querySelector(selector)).toBeTruthy();
                    expect(jQuery(selector).length).toBe(1);
                    done();
                    return [2 /*return*/];
                });
            });
        });
    });
});
