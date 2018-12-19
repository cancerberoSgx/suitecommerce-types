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
                var _this = this;
                if (!this._bindings) {
                    var boundAttributes = Object.keys(this.model.attributes);
                    var b_1 = {};
                    boundAttributes.forEach(function (a) {
                        var k = "[" + _this.bindAttribute(a) + "]";
                        b_1[k] = a;
                    });
                    this._bindings = b_1;
                }
                return tslib_1.__assign({}, this._bindings);
            },
            enumerable: true,
            configurable: true
        });
        BindView.prototype.getContext = function () {
            // this needs to be called each time and this.bindings needs to be high level new object each time that's why the getter
            BackboneFormView.add(this, { noCloneModel: true });
            return this.model.attributes;
        };
        BindView.prototype.bindAttribute = function (name) {
            return "data-bind=\"" + name + "\"";
        };
        return BindView;
    }(BackboneView));
});
