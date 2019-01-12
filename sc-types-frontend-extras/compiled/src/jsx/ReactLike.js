define('ReactLike', [], function () {
    var ReactLike_ = {
        /**
         * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
         */
        createElement: function (tag, attrs) {
            if (attrs === void 0) { attrs = {}; }
            var children = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                children[_i - 2] = arguments[_i];
            }
            var element = document.createElement(tag);
            for (var name_1 in attrs) {
                if (name_1 && attrs.hasOwnProperty(name_1)) {
                    var value = attrs[name_1];
                    if (value === true) {
                        element.setAttribute(name_1, name_1);
                    }
                    else if (typeof value === 'function') {
                        // see JSXView.render if supportsFunctionAttributes=== true there could be some parent that could have the _this view context as property. 
                        element.setAttribute(name_1, "var _this =  (ReactLike.searchFor__this && ReactLike.searchFor__this(this)) || this; (" + value.toString() + ").apply(_this, arguments)");
                    }
                    else if (value !== false && value != null) {
                        if (name_1 === 'className') {
                            name_1 = 'class';
                        }
                        element.setAttribute(name_1, value.toString());
                    }
                }
            }
            children.filter(function (c) { return c; }).forEach(function (child) {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child.toString()));
                }
                else {
                    var asArray = Array.isArray(child) ? child : [child];
                    asArray.forEach(function (c) { return element.appendChild(c); });
                }
            });
            return element;
        },
        renderDOM: function (parent, el) {
            parent.appendChild(el);
        },
        renderJQuery: function (parent, el) {
            parent.append(jQuery(el));
        },
        /** partial support for attribute functions like events, Experimental, not recommended, set it to falsy to disable at all , or just use backbone's view events. */
        searchFor__this: function (el) {
            return el && (el.__this || ReactLike_.searchFor__this(el.parentElement));
        }
    };
    self.ReactLike = ReactLike_;
    return ReactLike_;
});
