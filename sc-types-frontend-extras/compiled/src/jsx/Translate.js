define('Translate', ['ReactLike', 'ReactLike', 'Utils'], function (ReactLikeTextTransformer, ReactLike, Utils) {
    /**
     * JSX `<Translate>` helper
     */
    var _Translate = Object.assign(function (prop) {
        return ReactLike.createElement("span", null);
    }, {
        transformText: function (tag, attrs, parent, child, text) {
            return Utils.translate(text);
        }
    });
    function isHTMLElement(n) {
        return n && n.nodeType === 1 && n.outerHTML;
    }
    return _Translate;
});
