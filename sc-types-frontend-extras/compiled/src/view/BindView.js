define('BindView', ['Backbone.View', 'Backbone.Model', 'Backbone.FormView', "tslib"], function (BackboneView, BackboneModel, BackboneFormView, tslib_1) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(BindView, _super);
        function BindView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = function (c) { return "<div>JSXView: template not implemented</div>"; };
            return _this;
        }
        Object.defineProperty(BindView.prototype, "bindings", {
            // heads up - a getter for this.bindings, because we need to return a new high level object each time
            get: function () {
                return BindView.buildBindings(this);
            },
            enumerable: true,
            configurable: true
        });
        BindView.prototype.getContext = function () {
            var s = _super.prototype.getContext.call(this);
            BackboneFormView.add(this, { noCloneModel: true });
            return tslib_1.__assign({}, s, this.model.attributes);
        };
        BindView.prototype.bindAttribute = function (name) {
            return BindView.buildBindAttribute(name + '');
        };
        BindView.buildBindAttribute = function (name) {
            return "data-bind=\"" + name + "\"";
        };
        BindView.buildBindings = function (view) {
            if (!view._bindings) {
                var boundAttributes = Object.keys(view.model.attributes);
                var b_1 = {};
                boundAttributes.forEach(function (a) {
                    var k = "[" + BindView.buildBindAttribute(a) + "]";
                    b_1[k] = a;
                });
                view._bindings = b_1;
            }
            return tslib_1.__assign({}, view._bindings);
        };
        return BindView;
    }(BackboneView));
});
