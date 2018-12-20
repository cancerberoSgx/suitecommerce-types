define('BindView', ['Backbone.View', 'Backbone.Model', 'Backbone.FormView', "tslib"], function (BackboneView, BackboneModel, BackboneFormView, tslib_1) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(BindView, _super);
        function BindView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.template = function (c) { return "<div>JSXView: template not implemented</div>"; };
            _this._bindings = {};
            return _this;
        }
        Object.defineProperty(BindView.prototype, "bindings", {
            // heads up - a getter for this.bindings, because we need to return a new high level object each time is accessed (?)
            get: function () {
                return BindView.buildBindings(this);
            },
            enumerable: true,
            configurable: true
        });
        // getContext(): Context {
        //   return BindView.getContext(this as any) as any
        // }
        // getContext() {
        // const s = super.getContext()
        // return {...s, ...this.model.attributes}
        // }
        BindView.installFormView = function (v) {
            if (v._getContext) {
                console.log('exiting install form view ', BackboneFormView.add.toString().length, !!v.stickit);
                // return 
            }
            v._getContext = v.getContext;
            v.getContext = function () {
                return tslib_1.__assign({}, v._getContext(), v.model.attributes);
            };
            if (BackboneView.notInSc) {
                var stickit = require('../../spec/ported/backbone.stickit');
                var BackboneFormViewPartial = require('../../spec/ported/BackboneFormViewPartial').default;
                sc_types_frontend_1._.extend(v, stickit.ViewMixin);
                debugger;
                console.log('installing stickit, partial: ', Object.keys(BackboneFormViewPartial), 'sitickit: ', Object.keys(stickit));
                Object.assign(BackboneFormView, BackboneFormViewPartial);
            }
            BackboneFormView.add(v, { noCloneModel: true });
        };
        BindView.prototype.render = function () {
            BindView.installFormView(this);
            _super.prototype.render.call(this);
            return this;
        };
        BindView.prototype.bindAttribute = function (name) {
            return BindView.buildBindAttribute(name + '');
        };
        // static getContext<Model extends BackboneModel<TemplateContext> , Context extends TemplateContext = TemplateContext>(view:BackboneViewWithBindings<Model, Context> ): Context {
        //   // debugger
        //   const s = {} as any
        //   // const s = view.constructor.prototype. getContext.apply(view)// TODO: incompatible if they change getContext() signature
        //   // debugger
        //   BackboneFormView.add(view, { noCloneModel: true })
        //   return {...s, ...view.model.attributes}
        // }
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
