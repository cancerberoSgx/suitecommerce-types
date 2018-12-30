"use strict";
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore

//@ts-ignore
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
                    else if (value !== false && value != null) {
                        if (name_1 === 'className') {
                            name_1 = 'class';
                        }
                        element.setAttribute(name_1, value.toString());
                    }
                }
            }
            children.forEach(function (child) {
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
        //@ts-ignore
        //@ts-ignore
        renderJQuery: function (parent, el) {
            //@ts-ignore
            parent.append(jQuery(el));
        }
    };
    self.ReactLike = ReactLike_;
    return ReactLike_;
});
