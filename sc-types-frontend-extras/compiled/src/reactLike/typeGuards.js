define('typeGuards', [], function () {
    return {
        isTextTransformer: function (n) {
            return n && n.transformText;
        },
        isChildTransformer: function (n) {
            return n && n.transformChild;
        },
        isReactLikeChildAddTransformer: function (n) {
            return n && n.addChild;
        },
        isNode: function (n) {
            return n && n.nodeType;
        },
        isReactLikeComponent: function (c) {
            return c.prototype && c.prototype.render;
        },
        isHTMLElement: function (n) {
            return n && n.nodeType === 1 && n.outerHTML;
        }
    };
});
