"use strict";

define('MineModel', ['Backbone.Model', "tslib"], function (BackboneModel, tslib_1) {
    function sleep(ms) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(function () {
                        resolve();
                    }, ms); })];
            });
        });
    }
    return BackboneModel.extend({
        magick: function (t) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sleep(t)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, t + 1];
                    }
                });
            });
        }
    });
});
