"use strict";

define('BackboneSimpleTest1', ['BackboneSimpleTest1ListView', 'BackboneSimpleTest1Router', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(BackboneSimpleTest1ListView, BackboneSimpleTest1Router, tslib_1) {
    return {
        mountToApp: function(application) {
            var _this = this;
            var pdp = application.getComponent('PDP'); // look ma no casting needed :)
            pdp.removeChildView(pdp.PDP_FULL_VIEW, 'Global.StarRating');
            pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                'Global.StarRating': {
                    'backbone-simple-test1': {
                        childViewConstructor: BackboneSimpleTest1ListView
                    },
                    'backbone-simple-test2': {
                        childViewConstructor: function() { return new BackboneSimpleTest1ListView(); }
                    }
                }
            });
            new BackboneSimpleTest1Router();
            application.getLayout().on("afterAppendView", function(view) {
                return tslib_1.__awaiter(_this, void 0, void 0, function() {
                    return tslib_1.__generator(this, function(_a) {
                        return [2 /*return*/];
                    });
                });
            });
        }
    };
});
