define('TypedBackboneModel', ['Backbone.Model'], function (BackboneModel) {
    return class TypedBackboneModel extends BackboneModel {
        setAttributes(a) {
            return super.set(a);
        }
        getAttributes() {
            return this.attributes;
        }
        getAttribute(name) {
            return super.get(name);
        }
        setAttribute(name, value, options) {
            return super.set(name, value, options);
        }
    };
});
