"use strict";

define('BackboneSimpleTest1LandingView', ['backbone_simple_test1_landing_view.tpl', 'Backbone.Model', 'Backbone.View', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(template, BackboneModel, BackboneView, tslib_1) {
    return /** @class */ (function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = template;
            return _this;
        }
        class_1.prototype.events = function() {
            return {};
        };
        class_1.prototype.initialize = function(options) {
            _super.prototype.initialize.call(this, options);
            this.pageId = options.id;
        };
        class_1.prototype.getContext = function() {
            return {
                id: this.pageId
            };
        };
        return class_1;
    }(BackboneView));
});
