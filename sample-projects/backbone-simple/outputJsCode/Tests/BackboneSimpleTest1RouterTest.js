"use strict";

define('BackboneSimpleTest1RouterTest', ['Backbone', 'UnitTestHelper', 'BackboneSimpleTest1Router', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(Backbone, SCAUnitTestHelper, BackboneSimpleTest1Router, tslib_1) {
    var _this = this;
    return describe('BackboneSimpleTest1Router', function() {
        it('handle page/1', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var s, r;
                return tslib_1.__generator(this, function(_a) {
                    s = '';
                    Backbone.history.stop();
                    r = new BackboneSimpleTest1Router();
                    r.debugRouteListener = function(page, args) {
                        s = page + args.join(', ');
                    };
                    Backbone.history.start();
                    Backbone.history.navigate('nonExistent', { trigger: true });
                    Backbone.history.navigate('page/1', { trigger: true });
                    expect(s).toContain('page1');
                    Backbone.history.navigate('page/2', { trigger: true });
                    expect(s).toContain('page2');
                    Backbone.history.stop();
                    Backbone.history.navigate('', { trigger: true });
                    done();
                    return [2 /*return*/];
                });
            });
        });
        it('instantiated in application module shows view', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                return tslib_1.__generator(this, function(_a) {
                    Backbone.history.stop();
                    new SCAUnitTestHelper({
                        startApplication: function(app) {
                            expect(jQuery('#content #1').length).toBe(0);
                            Backbone.history.start();
                            Backbone.history.navigate('nonExistent', { trigger: true });
                            Backbone.history.navigate('page/1', { trigger: true });
                            expect(jQuery('#content #1').length).toBe(1);
                            Backbone.history.navigate('page/2', { trigger: true });
                            expect(jQuery('#content #1').length).toBe(0);
                            expect(jQuery('#content #2').length).toBe(1);
                            Backbone.history.stop();
                            Backbone.history.navigate('', { trigger: true });
                            done();
                        },
                        mountModules: [{
                            mountToApp: function(app) {
                                var r = new BackboneSimpleTest1Router();
                                r.application = app;
                            }
                        }]
                    });
                    return [2 /*return*/];
                });
            });
        });
    });
});
