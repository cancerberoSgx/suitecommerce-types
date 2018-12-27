"use strict";

define('ReactLike', [], function () {
    var ReactLike_ = {
        /**
         * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
         */
        createElement: function (tag, attrs, children) {
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
            for (var i = 2; i < arguments.length; i++) {
                var child = arguments[i];
                element.appendChild(child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
            }
            return element;
        },
        renderDOM: function (parent, el) {
            parent.appendChild(el);
        }
    };
    self.ReactLike = ReactLike_;
    return ReactLike_;
});
