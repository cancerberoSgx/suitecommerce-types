"use strict";
//@ts-ignore
//@ts-ignore

//@ts-ignore
define('CoolFeature56MainView', ['CoolFeature56MainViewTemplate', 'CoolFeature56MainViewTemplate', 'CoolFeature56Model', 'JSXView', 'Backbone.Model', 'underscore', "tslib"], function (CoolFeature56MainViewContext, CoolFeature56MainViewTemplate, CoolFeature56Model, JSXView, BackboneModel, underscore, tslib_1) {
    //@ts-ignore
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.jsxTemplate = CoolFeature56MainViewTemplate;
            _this.events = {
                'click [data-action="validate"]': 'customValidation',
                'click [data-action="change"]': 'changed'
            };
            _this.model = new CoolFeature56Model();
            _this.changed = underscore.throttle(function (e) { }, 1000);
            return _this;
        }
        class_1.prototype.getContext = function () {
            return tslib_1.__assign({}, _super.prototype.getContext.call(this) || {}, { name: 'seba', dreams: [
                    { name: 'Fooo', description: 'babaababa' },
                    { name: 'Baaar', description: 'Hello world' },
                    { name: 'Lorem', description: 'Ipsum morgan freeman' }
                ] });
        };
        class_1.prototype.customValidation = function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var r;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.fetch('')];
                        case 1:
                            r = _a.sent();
                            return [4 /*yield*/, this.render()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.model.get('validation') + r];
                    }
                });
            });
        };
        return class_1;
    }(JSXView));
});
