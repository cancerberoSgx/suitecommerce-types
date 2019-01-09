"use strict";

define('BackboneSimpleTest1Collection', ['Backbone.Collection', 'Backbone.Model', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(BackboneCollection, BackboneModel, tslib_1) {
    return /** @class */ (function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.initialize = function(attributes, options) {
            _super.prototype.initialize.call(this, attributes, options);
            this.models = [
                new BackboneModel({ value: 'value1' }),
                new BackboneModel({ value: 'value2' }),
            ];
        };
        return class_1;
    }(BackboneCollection));
});
