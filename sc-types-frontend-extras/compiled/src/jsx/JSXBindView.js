define('JSXBindView', ['Backbone.View', 'Backbone.Model', 'Backbone.FormView', 'BindView', 'JSXView', "tslib"], function (BackboneView, BackboneModel, BackboneFormView, BindView, JSXView, tslib_1) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(JSXBindView, _super);
        function JSXBindView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = function (c) { return "<div>JSXBindView: template not implemented</div>"; };
            return _this;
        }
        Object.defineProperty(JSXBindView.prototype, "bindings", {
            // heads up - a getter for this.bindings, because we need to return a new high level object each time
            get: function () {
                return BindView.buildBindings(this);
            },
            enumerable: true,
            configurable: true
        });
        JSXBindView.prototype.getContext = function () {
            var s = _super.prototype.getContext.call(this);
            BackboneFormView.add(this, { noCloneModel: true });
            return tslib_1.__assign({}, s, this.model.attributes);
        };
        return JSXBindView;
    }(JSXView));
});
