define('ReactLike', ['createElement', 'render', 'transformers', "tslib"], function (createElementModule, render, transformers, tslib_1) {
    var ReactLike_ = tslib_1.__assign({}, createElementModule, render, transformers);
    var _self = typeof self === 'undefined' ? window : self;
    _self.ReactLike = ReactLike_;
    return ReactLike_;
});
