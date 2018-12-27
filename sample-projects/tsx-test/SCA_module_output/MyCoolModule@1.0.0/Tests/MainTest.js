"use strict";

define('MainTest', ['ReactLike', 'Main', 'jQuery', "tslib"], function (ReactLike, Main, jQuery, tslib_1) {
    var _this = this;
    return describe('foo', function () {
        it('should', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                expect(document.querySelector('.unique-unique123')).toBeFalsy();
                expect(jQuery('.unique-unique123').length).toBe(0);
                ReactLike.renderDOM(document.body, Main);
                expect(document.querySelector('.unique-unique123')).toBeTruthy();
                expect(jQuery('.unique-unique123').length).toBe(1);
                done();
                return [2 /*return*/];
            });
        }); });
    });
});
