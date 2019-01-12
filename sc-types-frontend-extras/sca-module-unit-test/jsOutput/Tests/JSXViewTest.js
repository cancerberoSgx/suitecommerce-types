define('JSXViewTest', ['Backbone', 'Backbone', 'Backbone.Model', 'jQuery', 'JSXView', 'ReactLike', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(FormEvent, MouseEvent, BackboneModel, jQuery, JSXView, ReactLike, tslib_1) {
    return describe('JSXView', function() {
        var Model1 = /** @class */ (function(_super) {
            tslib_1.__extends(Model1, _super);
            function Model1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Model1;
        }(BackboneModel));
        var ViewWithEventAttributesReferencingThisDontWork = /** @class */ (function(_super) {
            tslib_1.__extends(ViewWithEventAttributesReferencingThisDontWork, _super);
            function ViewWithEventAttributesReferencingThisDontWork() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.counter = '';
                _this.supportsFunctionAttributes = true;
                _this.jsxTemplate = function(context) {
                    return ReactLike.createElement("div", null,
                        ReactLike.createElement("div", { className: "view1" },
                            "Name: ",
                            context.name),
                        ReactLike.createElement("button", { className: "functionAttributeMethodCall1", onClick: function(e) { return _this.clicked1(e); } }, "e=>this.clicked(e) works with supportsFunctionAttributes = true"),
                        ReactLike.createElement("button", {
                            className: "functionAttributeInline", onClick: function(e) {
                                e.preventDefault();
                                console.log('clicked', e.button, e.clientX, _this.cid);
                                _this.counter = 'functionAttributeInline';
                            }
                        }, "e=>inline implementation with references to this should work"),
                        ReactLike.createElement("button", { className: "functionAttributeBound", onClick: _this.clicked3.bind(_this) }, "this.clicked.bind(this) don't work at all"),
                        ReactLike.createElement("button", { className: "functionAttributeDirectly", onClick: _this.clicked2 }, "this.clicked will work and this will be automatically bind"),
                        ReactLike.createElement("button", {
                            className: "functionAttributeInlineNoRefs", onClick: function(e) {
                                e.preventDefault();
                                console.log('clicked');
                                window.externalCounter = 'functionAttributeInlineNoRefs';
                            }
                        }, "inline fn attribute with no references to scope (this) should always work"),
                        ReactLike.createElement("input", { onInput: function(e) { return _this.changed(e); } }));
                };
                return _this;
            }
            ViewWithEventAttributesReferencingThisDontWork.prototype.clicked1 = function(e) {
                e.preventDefault();
                console.log('clicked', e.button, e.clientX, this.cid);
                this.counter = 'functionAttributeMethodCall1';
            };
            ViewWithEventAttributesReferencingThisDontWork.prototype.clicked2 = function(e) {
                e.preventDefault();
                console.log('clicked', e.button, e.clientX, this.cid);
                this.counter = 'functionAttributeDirectly';
            };
            ViewWithEventAttributesReferencingThisDontWork.prototype.clicked3 = function(e, type) {
                e.preventDefault();
                console.log('clicked', e.button, e.clientX, this.cid);
                this.counter = 'functionAttributeBound';
            };
            ViewWithEventAttributesReferencingThisDontWork.prototype.changed = function(e) {
                console.log('changed', e.currentTarget.value, this.cid);
            };
            return ViewWithEventAttributesReferencingThisDontWork;
        }(JSXView));
        describe('function attributes', function() {
            var view1;
            beforeEach(function() {
                view1 = new ViewWithEventAttributesReferencingThisDontWork();
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
            it('should handle attribute event handlers written inline', function() {
                view1.render();
                expect(view1.$('.functionAttributeInline').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.functionAttributeInline').click();
                expect(view1.counter).toBe('functionAttributeInline');
            });
            it('should handle attribute event handlers written inline without refs to scope or this', function() {
                view1.render();
                expect(view1.$('.functionAttributeInlineNoRefs').length).toBeGreaterThan(0);
                expect(window.externalCounter).toBe('');
                view1.$('.functionAttributeInlineNoRefs').click();
                expect(window.externalCounter).toBe('functionAttributeInlineNoRefs');
            });
            it('should handle attribute event handlers calling a method', function() {
                view1.render();
                expect(view1.$('.functionAttributeMethodCall1').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.functionAttributeMethodCall1').click();
                expect(view1.counter).toBe('functionAttributeMethodCall1');
            });
            it('should handle attribute event handlers referencing method directly', function() {
                view1.render();
                expect(view1.$('.functionAttributeDirectly').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.functionAttributeDirectly').click();
                expect(view1.counter).toBe('functionAttributeDirectly');
            });
            xit('should handle function attribute bound to this', function() {
                view1.render();
                expect(view1.$('.functionAttributeBound').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.functionAttributeBound').click();
                expect(view1.counter).toBe('functionAttributeBound');
            });
            it('if ReactLike.supportFunctionAttributes is falsy then fn attributes must be disabled', function() {
                view1.supportsFunctionAttributes = true;
                ReactLike.supportFunctionAttributes = false;
                view1.render();
                var h = view1.$el.get(0).outerHTML;
                expect(h).not.toContain('ReactLike._searchForThisView(this)');
            });
            it('if view.supportsFunctionAttributes is false then fn attributes must be disabled', function() {
                view1.supportsFunctionAttributes = false;
                view1.render();
                expect(view1.$('.functionAttributeInline').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.functionAttributeInline').click();
                expect(view1.counter).toBe('');
                expect(view1.$('.functionAttributeDirectly').length).toBeGreaterThan(0);
                expect(view1.counter).toBe('');
                view1.$('.functionAttributeDirectly').click();
                expect(view1.counter).toBe('');
            });
        });
    });
});
