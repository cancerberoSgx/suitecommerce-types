"use strict";

define('BackboneSimpleTest1Model', ['Backbone.Model', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(BackboneModel, tslib_1) {
    return /** @class */ (function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.initialize = function(attributes, options) {
            _super.prototype.initialize.call(this, attributes, options);
        };
        class_1.prototype.somethingNew = function() {
            return [1, 2, 3];
        };
        class_1.prototype.fetch = function(options) {
            var _this = this;
            // return jQuery.Deferred().resolveWith({foo: `bar_${this.i}`}) as any
            var p = _super.prototype.fetch.call(this, options);
            p.then(function(response) { return response.bar = _this.somethingNew(); });
            return p;
        };
        class_1.prototype.parse = function(response, options) {
            return tslib_1.__assign({}, _super.prototype.parse.call(this, response, options), { foo: 112 });
        };
        return class_1;
    }(BackboneModel));
});
