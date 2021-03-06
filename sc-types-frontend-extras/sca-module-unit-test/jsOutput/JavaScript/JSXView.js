
define('JSXView', ['Backbone.Model', 'Backbone.View', 'PluginContainer', 'ReactLike', "tslib"], function (BackboneModel, BackboneView, PluginContainer, ReactLike, tslib_1) {
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
            _this.supportsFunctionAttributes = false;
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
                        var rendered = view.jsxTemplate(view.getContext());
                        if (ReactLike.supportFunctionAttributes && view.supportsFunctionAttributes) {
                            rendered.__this = view;
                        }
                        ReactLike.renderJQuery($fragment, rendered);
                    }
                    return $fragment;
                }
            });
        };
        return JSXView;
    }(BackboneView));
});

