define('JSXViewVisualState', ['Backbone.Model', 'Backbone', 'Backbone.View', 'PluginContainer', 'ReactLike'], function (BackboneModel, Backbone, BackboneView, PluginContainer, ReactLike) {
    return class JSXViewWithState extends BackboneView {
        setState(state) {
            if (!this.visualState) {
                this.visualState = new BackboneModel();
            }
            this.visualState.set(state);
        }
        initialize(options) {
            super.initialize(options);
        }
    };
});
