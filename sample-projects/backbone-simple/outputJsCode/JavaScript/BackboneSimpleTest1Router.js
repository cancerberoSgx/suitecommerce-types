"use strict";

define('BackboneSimpleTest1Router', ['Backbone.Router', 'BackboneSimpleTest1LandingView', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(BackboneRouter, BackboneSimpleTest1LandingView, tslib_1) {
    return /** @class */ (function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.routes = {
                'page/:id': 'page'
            };
            return _this;
        }
        class_1.prototype.page = function(id) {
            var view = new BackboneSimpleTest1LandingView({ id: id });
            view.showContent();
        };
        return class_1;
    }(BackboneRouter));
});
