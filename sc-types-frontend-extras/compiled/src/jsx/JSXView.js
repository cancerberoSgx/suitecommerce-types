"use strict";

define('JSXView', ['Backbone.Model', 'Backbone.View', 'PluginContainer', 'JSXTemplate', 'ReactLike', "tslib"], function (BackboneModel, BackboneView, PluginContainer, JSXTemplate, ReactLike, tslib_1) {
    function isJSXView(view) {
        return view.jsxTemplate;
    }
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
