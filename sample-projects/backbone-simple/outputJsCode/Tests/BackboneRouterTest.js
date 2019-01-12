"use strict";

define('BackboneRouterTest', ['Backbone', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(Backbone, tslib_1) {
    var _this = this;
    return describe('Backbone.Router', function() {
        it('Backbone.Router.extend()', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var counter, Workspace;
                return tslib_1.__generator(this, function(_a) {
                    counter = 0;
                    Backbone.history.stop();
                    Workspace = Backbone.Router.extend({
                        routes: {
                            "help": "help"
                        },
                        help: function() {
                            counter++;
                        }
                    });
                    new Workspace();
                    Backbone.history.start();
                    Backbone.history.navigate('help1', { trigger: true });
                    Backbone.history.navigate('help', { trigger: true });
                    expect(counter).toBeGreaterThan(0);
                    Backbone.history.stop();
                    counter = 0;
                    Backbone.history.navigate('help1', { trigger: true });
                    Backbone.history.navigate('help', { trigger: true });
                    expect(counter).toBe(0, 'stop() should stop route listening');
                    done();
                    return [2 /*return*/];
                });
            });
        });
        xit('class extends Backbone.Router', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var counter, Workspace2;
                return tslib_1.__generator(this, function(_a) {
                    counter = 0;
                    Backbone.history.stop();
                    Workspace2 = /** @class */ (function(_super) {
                        tslib_1.__extends(Workspace2, _super);
                        function Workspace2() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.routes = {
                                "help": "help"
                            };
                            return _this;
                        }
                        Workspace2.prototype.help = function() {
                            console.log('falksdjkfsjdlfkslkdfj');
                            counter++;
                        };
                        return Workspace2;
                    }(Backbone.Router));
                    new Workspace2();
                    Backbone.history.start();
                    Backbone.history.navigate('nonExistent', { trigger: true });
                    Backbone.history.navigate('help', { trigger: true });
                    expect(counter).toBeGreaterThan(0);
                    counter = 0;
                    Backbone.history.stop();
                    Backbone.history.navigate('help1', { trigger: true });
                    Backbone.history.navigate('help', { trigger: true });
                    expect(counter).toBe(0, 'stop() should stop route listening');
                    Backbone.history.stop();
                    Backbone.history.navigate('', { trigger: true });
                    done();
                    return [2 /*return*/];
                });
            });
        });
        it('class extends Backbone.Router routes in prototype to workaround the problem', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var counter, Workspace2;
                return tslib_1.__generator(this, function(_a) {
                    counter = 0;
                    Backbone.history.stop();
                    Workspace2 = /** @class */ (function(_super) {
                        tslib_1.__extends(Workspace2, _super);
                        function Workspace2() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        Workspace2.prototype.help = function() {
                            console.log('falksdjkfsjdlfkslkdfj');
                            counter++;
                        };
                        return Workspace2;
                    }(Backbone.Router));
                    Workspace2.prototype.routes = {
                        "help3": "help"
                    };
                    new Workspace2();
                    Backbone.history.start();
                    Backbone.history.navigate('nonExistent', { trigger: true });
                    Backbone.history.navigate('help3', { trigger: true });
                    expect(counter).toBeGreaterThan(0);
                    counter = 0;
                    Backbone.history.stop();
                    Backbone.history.navigate('nonExistent', { trigger: true });
                    Backbone.history.navigate('help3', { trigger: true });
                    expect(counter).toBe(0, 'stop() should stop route listening');
                    Backbone.history.stop();
                    Backbone.history.navigate('', { trigger: true });
                    done();
                    return [2 /*return*/];
                });
            });
        });
        it('class extends Backbone.Router routes defined with getters  so they are in in prototype to workaround the problem', function(done) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var counter, Workspace2;
                return tslib_1.__generator(this, function(_a) {
                    counter = 0;
                    Backbone.history.stop();
                    Workspace2 = /** @class */ (function(_super) {
                        tslib_1.__extends(Workspace2, _super);
                        function Workspace2() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        Object.defineProperty(Workspace2.prototype, "routes", {
                            get: function() {
                                return { "help3": "help" };
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Workspace2.prototype.help = function() {
                            console.log('kajhdkjahsdkj');
                            counter++;
                        };
                        return Workspace2;
                    }(Backbone.Router));
                    new Workspace2();
                    Backbone.history.start();
                    Backbone.history.navigate('nonExistent', { trigger: true });
                    Backbone.history.navigate('help3', { trigger: true });
                    expect(counter).toBeGreaterThan(0);
                    counter = 0;
                    Backbone.history.stop();
                    Backbone.history.navigate('nonExistent', { trigger: true });
                    Backbone.history.navigate('help3', { trigger: true });
                    expect(counter).toBe(0, 'stop() should stop route listening');
                    Backbone.history.stop();
                    Backbone.history.navigate('', { trigger: true });
                    done();
                    return [2 /*return*/];
                });
            });
        });
    });
});
