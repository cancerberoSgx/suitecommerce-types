define('JSXReusingTest', ['Backbone', 'Backbone.Model', 'jQuery', 'JSXView', 'ReactLike', "tslib", 'Backbone.View.Plugin.DebugTemplateName'], function(MouseEvent, BackboneModel, jQuery, JSXView, ReactLike, tslib_1) {
    return describe('JSXView and Backbone', function() {
        var Name = function(props) {
            return ReactLike.createElement("span", { className: "name", style: { border: '2px sold pink' } }, props.name);
        };
        var Age = function(props) {
            return ReactLike.createElement("span", { className: "age" }, props.age);
        };
        var Person = function(props) {
            return ReactLike.createElement("div", { className: "person" },
                ReactLike.createElement(Name, { name: props.name }),
                ReactLike.createElement(Age, { age: props.age }),
                props.contacts.map(function(a) {
                    return ReactLike.createElement(Contact, { addresses: a.addresses, phone: a.phone });
                }));
        };
        var Address = function(props) {
            return ReactLike.createElement("span", null,
                props.name,
                " number: ",
                props.number);
        };
        var Contact = function(a) {
            return ReactLike.createElement("div", null,
                "Addresses:",
                a.addresses.map(function(ad) {
                    return ReactLike.createElement("div", null,
                        "Street 1: ",
                        ReactLike.createElement(Address, { name: ad.name, number: ad.number }));
                }));
        };
        var ViewJSXAndBackboneEvents = /** @class */ (function(_super) {
            tslib_1.__extends(ViewJSXAndBackboneEvents, _super);
            function ViewJSXAndBackboneEvents() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.jsxTemplate = function(context) {
                    return ReactLike.createElement("div", null,
                        context.persons.map(function(p) {
                            return ReactLike.createElement(Person, { name: p.name, age: p.age, contacts: p.contacts });
                        }),
                        ReactLike.createElement("br", null),
                        ReactLike.createElement("button", { className: "clickme1" }, "clickme1"));
                };
                _this.context = { persons: [] };
                return _this;
            }
            ViewJSXAndBackboneEvents.prototype.events = function() {
                return {
                    'click .clickme1': this.clickme1.bind(this)
                };
            };
            ViewJSXAndBackboneEvents.prototype.getContext = function() {
                return this.context;
            };
            ViewJSXAndBackboneEvents.prototype.clickme1 = function(e) {
                e.preventDefault();
                console.log('clickme1');
            };
            return ViewJSXAndBackboneEvents;
        }(JSXView));
        describe('Backbone events', function() {
            var view1;
            beforeEach(function() {
                view1 = new ViewJSXAndBackboneEvents();
                view1.$el = jQuery('<div></div>').appendTo('body');
            });
            afterEach(function() {
                // view1.destroy()
            });
            it('should render a list of composed custom tags', function() {
                view1.context = {
                    persons: [
                        { name: 'seba', age: 18, contacts: [{ addresses: [{ name: 'foo', number: 1221 }], phone: '123123123' }] },
                        { name: 'laura', age: 15, contacts: [{ addresses: [{ name: 'bar', number: 8787 }], phone: '987987987' }] }
                    ]
                };
                expect(document.querySelectorAll('.person').length).toBe(0);
                expect(document.querySelectorAll('.name').length).toBe(0);
                expect(document.querySelectorAll('.age').length).toBe(0);
                view1.render();
                expect(document.querySelectorAll('.person').length).toBe(2);
                expect(document.querySelectorAll('.name').length).toBe(2);
                expect(document.querySelectorAll('.age').length).toBe(2);
                var seba = Array.prototype.slice.call(document.querySelectorAll('.person')).find(function(e) { return e.innerText.includes('seba'); });
                expect(seba.innerText).toContain('18');
                // debugger
            });
        });
    });
});
