"use strict";
//@ts-ignore
//@ts-ignore
//@ts-ignore

//@ts-ignore
define('CoolFeature56MainView2', ['Backbone.Model', 'underscore', 'CoolFeature56Model', 'JSXView', 'ReactLike', 'JSXTemplate', "tslib"], function (BackboneModel, underscore, CoolFeature56Model, JSXView, ReactLike, JSXTemplate, tslib_1) {
    //@ts-ignore
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.jsxTemplate = function (context) { return ReactLike.createElement("form", null,
                ReactLike.createElement("label", null,
                    "Name",
                    ReactLike.createElement("input", { value: context.name, className: "name" })),
                ReactLike.createElement("br", null),
                ReactLike.createElement("label", null,
                    "Last Name",
                    ReactLike.createElement("input", { value: context.lastName })),
                ReactLike.createElement("select", null, context.genders.map(function (g) {
                    return ReactLike.createElement("option", null, g);
                })),
                ReactLike.createElement("input", { type: "submit", className: "save" }, "Save")); };
            _this.events = {
                'click .save': _this.click.bind(_this),
                'keyup .name': _this.change.bind(_this)
            };
            return _this;
        }
        //@ts-ignore
        class_1.prototype.click = function (e) {
            e.preventDefault();
            e.stopPropagation();
            alert("Done, thanks! " + e.clientX);
        };
        //@ts-ignore
        class_1.prototype.change = function (e) {
            console.log('asdas', e.currentTarget.value);
        };
        class_1.prototype.getContext = function () {
            return {
                name: 'Sebastián',
                lastName: 'Gurin',
                gender: 'male',
                genders: ['male', 'women', 'other']
            };
        };
        return class_1;
    }(JSXView));
});
