"use strict";
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore

//@ts-ignore
define('CoolFeature56MainViewTest', ['ReactLike', 'Main', 'jQuery', 'CoolFeature56MainView', "tslib"], function (ReactLike, Main, jQuery, CoolFeature56MainView, tslib_1) {
    var _this = this;
    return describe('CoolFeature view', function () {
        //@ts-ignore
        it('should render', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var view, c;
            return tslib_1.__generator(this, function (_a) {
                expect(document.querySelector('.jojojo')).toBeFalsy();
                expect(jQuery('.jojojo').length).toBe(0);
                debugger;
                view = new CoolFeature56MainView();
                view.$el = jQuery('body');
                view.render();
                // ReactLike.renderDOM(document.body, Main)
                expect(document.querySelector('.jojojo')).toBeTruthy();
                c = jQuery('.jojojo');
                expect(c.length).toBe(1);
                done();
                return [2 /*return*/];
            });
        }); });
    });
});
