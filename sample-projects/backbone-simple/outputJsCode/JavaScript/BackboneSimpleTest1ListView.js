"use strict";

define('BackboneSimpleTest1ListView', ['backbone_simple_test1_list_view.tpl', 'Backbone.Collection', 'Backbone.Model', 'Backbone.View', 'BackboneSimpleTest1Collection', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(template, BackboneCollection, BackboneModel, BackboneView, BackboneSimpleTest1Collection, tslib_1) {
    return /** @class */ (function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = template;
            return _this;
        }
        class_1.prototype.events = function() {
            return {
                'click .add': this.add.bind(this)
            };
        };
        class_1.prototype.initialize = function(options) {
            _super.prototype.initialize.call(this, options);
            this.collection = new BackboneSimpleTest1Collection();
            this.collection.on('add remove', this.render.bind(this));
        };
        class_1.prototype.add = function(e) {
            var input = this.$('.toAdd');
            this.collection.add(new BackboneModel({ value: input.val() }));
        };
        class_1.prototype.getContext = function() {
            return {
                collection: this.collection
            };
        };
        return class_1;
    }(BackboneView));
});
