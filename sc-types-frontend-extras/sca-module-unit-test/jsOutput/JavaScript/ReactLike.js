
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
            var element;
            if (typeof tag === 'string') {
                element = document.createElement(tag);
            }
            else {
                element = tag(attrs);
                attrs = {}; // custom tags cannot declare html attirbutes, only ther own props, so we are removing them in order not to add them as html attrs in the following code
            }
            for (var name_1 in attrs) {
                if (name_1 && attrs.hasOwnProperty(name_1)) {
                    var value = attrs[name_1];
                    if (value === true) {
                        element.setAttribute(name_1, name_1);
                    }
                    else if (typeof value === 'function') {
                        if (ReactLike_.supportFunctionAttributes) {
                            // see JSXView.render if supportsFunctionAttributes=== true there could be some parent that could have the _this view context as property. 
                            element.setAttribute(name_1, "var _this = ReactLike._searchForThisView(this) || this; (" + value.toString() + ").apply(_this, arguments)");
                        }
                        else {
                            element.setAttribute(name_1, "(" + value.toString() + ").apply(this, arguments)");
                        }
                    }
                    else if (value !== false && value != null && typeof value !== 'object') {
                        if (name_1 === 'className') {
                            name_1 = 'class';
                        }
                        element.setAttribute(name_1, value.toString());
                    }
                    // else {
                    //   console.log('ignoring attribute type ', typeof value, value);
                    // }
                }
            }
            children.filter(function (c) { return c; }).forEach(function (child) {
                if (child.nodeType) {
                    element.appendChild(child);
                }
                else if (Array.isArray(child)) {
                    child.forEach(function (c) {
                        // if (!c.nodeType) {
                        //   debugger
                        // }
                        element.appendChild(c);
                    });
                }
                else {
                    element.appendChild(document.createTextNode(child.toString()));
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
        _searchForThisView: function (el) {
            return el && (el.__this || ReactLike_._searchForThisView(el.parentElement));
        },
        /** partial support for JSX attribute functions like event handlers.
         * Experimental!, not recommended, set it to falsy to disable at all, or just use backbone's view events.
         * If true, handlers will only have access to attributes and this, but they won't be able to reference
         * other variables in the scope of the JSX. Also there could be some performance impact on event handling.
         * */
        supportFunctionAttributes: false
    };
    self.ReactLike = ReactLike_;
    return ReactLike_;
});

