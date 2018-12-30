"use strict";
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore

//@ts-ignore
define('JSXView', ['Backbone.View', 'Backbone.Model', 'PluginContainer', 'ReactLike', 'JSXTemplate', "tslib"], function (BackboneView, BackboneModel, PluginContainer, ReactLike, JSXTemplate, tslib_1) {
    function isJSXView(view) {
        return view.jsxTemplate;
    }
    //@ts-ignore
    return /** @class */ (function (_super) {
        tslib_1.__extends(JSXView, _super);
        function JSXView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return "<div></div>";
            };
            return _this;
        }
        JSXView.prototype.initialize = function (options) {
            _super.prototype.initialize.call(this, options);
            if (!this.preRenderPlugins) {
                //@ts-ignore
                //@ts-ignore
                this.preRenderPlugins = new PluginContainer();
            }
            this.preRenderPlugins.install({
                name: 'jsx',
                execute: function ($fragment, view) {
                    if (isJSXView(view)) {
                        ReactLike.renderJQuery($fragment, view.jsxTemplate(view.getContext()));
                    }
                    return $fragment;
                }
            });
        };
        return JSXView;
    }(BackboneView));
});
