define('JSXAndBackboneEventsTest', ['Backbone', 'Backbone.Model', 'jQuery', 'JSXView', 'ReactLike', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(MouseEvent, BackboneModel, jQuery, JSXView, ReactLike, tslib_1) {
    return describe('JSXView and Backbone', function() {
        var Model1 = /** @class */ (function(_super) {
            tslib_1.__extends(Model1, _super);
            function Model1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Model1;
        }(BackboneModel));
        var ViewJSXAndBackboneEvents = /** @class */ (function(_super) {
            tslib_1.__extends(ViewJSXAndBackboneEvents, _super);
            function ViewJSXAndBackboneEvents() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.counter = '';
                _this.jsxTemplate = function(context) {
                    return ReactLike.createElement("div", null,
                        ReactLike.createElement("div", { className: "view1" },
                            "Name: ",
                            context.name),
                        ReactLike.createElement("button", { className: "clickme1" }, "clickme1"),
                        ReactLike.createElement("button", { className: "clickme2" }, "clickme2"));
                };
                return _this;
            }
            ViewJSXAndBackboneEvents.prototype.events = function() {
                return {
                    'click .clickme1': this.clickme1.bind(this),
                    'click .clickme2': 'clickme2'
                };
            };
            ViewJSXAndBackboneEvents.prototype.clickme1 = function(e) {
                e.preventDefault();
                this.counter = 'clickme1';
            };
            ViewJSXAndBackboneEvents.prototype.clickme2 = function(e) {
                e.preventDefault();
                this.counter = 'clickme2';
            };
            return ViewJSXAndBackboneEvents;
        }(JSXView));
        describe('Backbone events', function() {
            var view1;
            beforeEach(function() {
                view1 = new ViewJSXAndBackboneEvents();
                view1.$el = jQuery('<div></div>').appendTo('body');
                window.externalCounter = '';
                ReactLike.supportFunctionAttributes = true;
            });
            afterEach(function() {
                view1.destroy();
            });
            it('should render', function() {
                var selector = '.view1';
                expect(document.querySelector(selector)).toBeFalsy();
                view1.render();
                expect(document.querySelector(selector)).toBeTruthy();
            });
            it('should handle event declared with backbone giving functions', function() {
                view1.render();
                expect(view1.$('.clickme1').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.clickme1').click();
                expect(view1.counter).toBe('clickme1');
            });
            it('should handle event declared with backbone giving method names', function() {
                view1.render();
                expect(view1.$('.clickme2').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.clickme2').click();
                expect(view1.counter).toBe('clickme2');
            });
        });
    });
});
