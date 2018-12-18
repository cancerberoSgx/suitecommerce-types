define('JSXView', ['Backbone.Model', 'Backbone.View', 'PluginContainer', 'ReactLike'], function (BackboneModel, BackboneView, PluginContainer, ReactLike) {
    function isJSXView(view) {
        return view.jsxTemplate;
    }
    return class JSXView extends BackboneView {
        constructor() {
            super(...arguments);
            this.template = (...args) => `<div>JSXView: template not implemented</div>`;
            this.jsxTemplate = c => { throw new Error('jsxTemplate not implemented'); };
            this.supportsFunctionAttributes = false;
        }
        initialize(options) {
            super.initialize(options);
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
                        ReactLike.renderJQuery($fragment, rendered);
                    }
                    return $fragment;
                }
            });
        }
    };
});
