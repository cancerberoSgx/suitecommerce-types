"use strict";

define('BackboneSimpleTest1View', ['backbone_simple_test1_view.tpl', 'Backbone.View', 'BackboneSimpleTest1Model', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(template, BackboneView, BackboneSimpleTest1Model, tslib_1) {
    return /** @class */ (function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = template;
            return _this;
        }
        class_1.prototype.events = function() {
            return {
                'keyup .change': this.change.bind(this)
            };
        };
        class_1.prototype.initialize = function(options) {
            _super.prototype.initialize.call(this, options);
            this.model = new BackboneSimpleTest1Model();
            this.model.set('value', 'foo');
            this.model.on('change', this.render.bind(this));
        };
        class_1.prototype.change = function(e) {
            this.model.set('value', e.target.value);
        };
        class_1.prototype.getContext = function() {
            return {
                value: this.model.get('value')
            };
        };
        return class_1;
    }(BackboneView));
});
