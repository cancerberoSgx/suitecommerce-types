define('Bind', ['typeGuards', 'ReactLike', 'JSXBindView', 'Backbone.View'], function (TypeGuards, ReactLike, JSXBindView, BackboneView) {
    /**
     * Support JSX <Bind> tag to declare bindings with like: `<Bind name="age"><input type="number"></input></Bind>`
     * prints something like: `<input type="text" data-bind="age"></input>`.
     *
     * Uses `ReactLike.transformChild` feature
     *
     * Is used by JSXBindView to easy bind model-dom
     *
     * Supports Backbone.Collection attribute values render items using `view` class
     */
    var _Bind = function _Bind(prop) {
        return ReactLike.createElement("span", { "data-type": "bind" });
    };
    _Bind.transformChild = function (tag, attrs, parent, child) {
        if (attrs.name && TypeGuards.isHTMLElement(child)) {
            child.setAttribute('data-bind', attrs.name);
        }
        return child;
    };
    return _Bind;
});
