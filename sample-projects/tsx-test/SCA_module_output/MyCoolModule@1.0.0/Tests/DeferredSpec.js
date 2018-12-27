"use strict";

define('DeferredSpec', ['jQuery', "tslib"], function (jQuery, tslib_1) {
    var _this = this;
    return describe('Deferred', function () {
        it('supports await async', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            function f() {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, 2];
                    });
                });
            }
            // function g(): Promise<number>{
            //   return jQuery.Deferred().resolve(3)
            // }
            // expect(await g()).toBe(3)
            function h() {
                return jQuery.Deferred().resolve(4);
            }
            var _a, _b, v4;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = expect;
                        return [4 /*yield*/, f()];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).toBe(2);
                        _b = expect;
                        return [4 /*yield*/, h()];
                    case 2:
                        _b.apply(void 0, [_c.sent()]).toBe(4);
                        return [4 /*yield*/, h()];
                    case 3:
                        v4 = _c.sent();
                        debugger;
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
