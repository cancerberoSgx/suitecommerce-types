define('TypedBackboneModel', ['Backbone.Model', "tslib"], function (BackboneModel, tslib_1) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(TypedBackboneModel, _super);
        function TypedBackboneModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TypedBackboneModel.prototype.setAttributes = function (a) {
            return _super.prototype.set.call(this, a);
        };
        TypedBackboneModel.prototype.getAttributes = function () {
            return this.attributes;
        };
        TypedBackboneModel.prototype.setSomeAttributes = function (a) {
            return this.setAttributes(tslib_1.__assign({}, this.attributes, a));
        };
        // getSomeAttributes(names? :( keyof Attributes)[]) {
        // return this.setAttributes({...this.attributes, ...a})
        // }
        TypedBackboneModel.prototype.getAttribute = function (name) {
            return this.attributes[name];
        };
        TypedBackboneModel.prototype.setAttribute = function (name, value) {
            this.attributes[name] = value;
        };
        return TypedBackboneModel;
    }(BackboneModel));
});
