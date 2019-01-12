"use strict";

define('BackboneSimpleTest1Router', ['Backbone', 'BackboneSimpleTest1LandingView', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(Backbone, BackboneSimpleTest1LandingView, tslib_1) {
    var BackboneSimpleTest1Router = /** @class */ (function(_super) {
        tslib_1.__extends(BackboneSimpleTest1Router, _super);
        function BackboneSimpleTest1Router() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BackboneSimpleTest1Router.prototype, "routes", {
            // heads up we need to declare a getter because - cannot put routes as property here because backbone needs it to be in prototype, just like Backbone.View.events - need to be typed as method
            get: function() {
                return { 'page/:id': 'page' };
            },
            enumerable: true,
            configurable: true
        });
        BackboneSimpleTest1Router.prototype.page = function(id) {
            var view = new BackboneSimpleTest1LandingView({ id: id });
            this.application && this.application.getLayout().showContent(view);
            this.debugRouteListener && this.debugRouteListener('page', [id]);
        };
        return BackboneSimpleTest1Router;
    }(Backbone.Router));
    return BackboneSimpleTest1Router;
});
