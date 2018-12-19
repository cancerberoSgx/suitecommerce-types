define('transformers', ['typeGuards', 'ReactLike', 'ReactLike', 'ReactLike', 'ReactLike', 'ReactLike', 'ReactLike', 'ReactLike'], function (TypeGuards, ReactLikeTag, ReactLikeTextTransformer, ReactLikeValue, ReactLikeAttrs, ReactLikeChildTransformer, Transformers, ReactLike) {
    function getThis() {
        var _self = typeof self === 'undefined' ? window : self;
        return _self.ReactLike;
    }
    var Module = {
        _globalTextTransformers: [],
        addTextTransformer: function (transform) {
            getThis()._globalTextTransformers.push(transform);
        },
        /**
         * Converts all TextNodes, first applies the global TextTransformer s registered with ReactLike.globalTextTransformers() and then if the tag is a TextTransformer also that
         */
        _transformText: function (tag, attrs, parent, child, text) {
            getThis()._globalTextTransformers.forEach(function (t) {
                text = t.transformText(tag, attrs, parent, child, text);
            });
            if (TypeGuards.isTextTransformer(tag)) {
                text = tag.transformText(tag, attrs, parent, child, text);
            }
            return text;
        },
        _globalChildTransformers: [],
        addChildTransformer: function (transform) {
            getThis()._globalChildTransformers.push(transform);
        },
        _transformChild: function (tag, attrs, parent, child) {
            getThis()._globalChildTransformers.forEach(function (t) {
                child = t.transformChild(tag, attrs, parent, child);
            });
            if (TypeGuards.isChildTransformer(tag)) {
                child = tag.transformChild(tag, attrs, parent, child);
            }
            return child;
        },
    };
    // export default {
    //   public: Module as Transformers, 
    //   private: Module
    // }
    return Module;
});
