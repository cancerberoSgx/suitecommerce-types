define('JSXView', ['Backbone.Model', 'Backbone', 'Backbone.View', 'PluginContainer', "tslib"], function (BackboneModel, Backbone, BackboneView, PluginContainer, tslib_1) {
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
                return "<div>JSXView: template not implemented</div>";
            };
            _this.jsxTemplate = function (c) { throw new Error('jsxTemplate not implemented'); };
            _this.supportsFunctionAttributes = false;
            _this.options = {};
            return _this;
        }
        JSXView.prototype.initialize = function (options) {
            _super.prototype.initialize.call(this, options);
            this.options = tslib_1.__assign({}, this.options || {}, options);
            this.supportsFunctionAttributes = this.supportsFunctionAttributes || this.options.supportsFunctionAttributes;
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
                        if (!view.options.dontEmptyContainer) {
                            $fragment.empty();
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
