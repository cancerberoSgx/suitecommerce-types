"use strict";
//@ts-ignore

//@ts-ignore
define('CoolFeature56', ['CoolFeature56MainView', 'CoolFeature56MainView2', "tslib"], function (CoolFeature56MainView, CoolFeature56MainView2, tslib_1) {
    return {
        mountToApp: function (application) {
            var _this = this;
            var pdp = application.getComponent('PDP'); // look ma no casting needed :)
            pdp.addChildView(pdp.PDP_FULL_VIEW, function () { return new CoolFeature56MainView(); });
            pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                'Global.StarRating': {
                    'cool-feature': {
                        childViewIndex: 1,
                        childViewConstructor: function () { return new CoolFeature56MainView(); }
                    },
                    'cool-feature-2': {
                        childViewIndex: 2,
                        childViewConstructor: function () { return new CoolFeature56MainView2(); }
                    }
                }
            });
            //@ts-ignore
            application.getLayout().on("afterAppendView", function (view) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); });
        }
    };
});
