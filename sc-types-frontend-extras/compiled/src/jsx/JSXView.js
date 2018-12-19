define('JSXView', ['Backbone.Model', 'Backbone', 'Backbone.View', 'PluginContainer', 'ReactLike'], function (BackboneModel, Backbone, BackboneView, PluginContainer, ReactLike) {
    function isJSXView(view) {
        return view.jsxTemplate;
    }
    return class JSXView extends BackboneView {
        constructor() {
            super(...arguments);
            this.template = (...args) => `<div>JSXView: template not implemented</div>`;
            this.jsxTemplate = c => { throw new Error('jsxTemplate not implemented'); };
            this.supportsFunctionAttributes = false;
            this.options = {};
        }
        initialize(options) {
            super.initialize(options);
            this.options = Object.assign({}, this.options || {}, options);
            this.supportsFunctionAttributes = this.supportsFunctionAttributes || this.options.supportsFunctionAttributes;
            if (!this.preRenderPlugins) {
                this.preRenderPlugins = new PluginContainer();
            }
            this.preRenderPlugins.install({
                name: 'jsx',
                execute($fragment, view) {
                    if (isJSXView(view)) {
                        const rendered = view.jsxTemplate(view.getContext());
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
        }
    };
});
