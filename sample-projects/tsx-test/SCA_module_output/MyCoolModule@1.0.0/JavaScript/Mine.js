"use strict";

define('Mine', ['MineModel', 'ReactLike', 'Main', "tslib"], function (MineModel, ReactLike, Main, tslib_1) {
    return {
        mountToApp: function (application) {
            var _this = this;
            // alert('seba')
            application.getLayout().on("afterAppendView", function (view) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var m, r;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            m = new MineModel();
                            return [4 /*yield*/, m.magick(2)];
                        case 1:
                            r = _a.sent();
                            ReactLike.renderDOM(document.body, Main);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
});
