define('ReactLike', ["tslib"], function (tslib_1) {
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
            var originalAttrs = attrs;
            var element;
            if (typeof tag === 'string') {
                element = document.createElement(tag);
            }
            else {
                if (isReactLikeComponent(tag)) {
                    // support for class elements (react-component like)
                    element = new tag(tslib_1.__assign({}, attrs, { children: children })).render();
                }
                else {
                    // support for function elements (react-stateless like)
                    element = tag(tslib_1.__assign({}, attrs, { children: children }));
                }
                // custom tags cannot declare html attributes, only their own props, so we are removing them 
                // in order not to add them as html attrs in the following code
                attrs = {};
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
                            var innerApply = "(function(){(" + value.toString() + ").apply(__this__, arguments)}).apply(__this__, arguments); ";
                            element.setAttribute(name_1, "var __this__ = ReactLike._searchForThisView(this) || this; var _this = typeof _this === 'undefined' ? __this__ : _this; return " + innerApply);
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
                    else {
                        console.log('ignoring attribute type ', typeof value, value);
                    }
                }
            }
            children.filter(function (c) { return c; }).forEach(function (child) {
                if (isNode(child)) {
                    var toAppend = ReactLike_._transformChild(tag, originalAttrs, element, child);
                    ReactLike_._addChild(tag, attrs, element, toAppend);
                }
                else if (Array.isArray(child)) {
                    child.forEach(function (c) {
                        if (!isNode(c)) {
                            throw new Error('Child is not a node: ' + c + ', tag: ' + tag + ', originalAttrs: ' + originalAttrs);
                        }
                        var toAppend = ReactLike_._transformChild(tag, originalAttrs, element, c);
                        ReactLike_._addChild(tag, attrs, element, toAppend);
                    });
                }
                else {
                    var toAppend = document.createTextNode(ReactLike_._transformText(tag, originalAttrs, element, child, child + ''));
                    ReactLike_._addChild(tag, attrs, element, toAppend);
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
        /**
         * Partial support for JSX attribute functions like event handlers.
         * Experimental!, not recommended, set it to falsy to disable at all, or just use backbone's view events.
         * If true, handlers will only have access to attributes and this, but they won't be able to reference
         * other variables in the scope of the JSX. Also there could be some performance impact on event handling.
         * */
        supportFunctionAttributes: false,
        _globalTextTransformers: [],
        registerTextTransformer: function (transform) {
            ReactLike_._globalTextTransformers.push(transform);
        },
        /**
         * Converts all TextNodes, first applies the global TextTransformer s registered with ReactLike.globalTextTransformers() and then if the tag is a TextTransformer also that
         */
        _transformText: function (tag, attrs, parent, child, text) {
            ReactLike_._globalTextTransformers.forEach(function (t) {
                text = t.transformText(tag, attrs, parent, child, text);
            });
            if (isTextTransformer(tag)) {
                text = tag.transformText(tag, attrs, parent, child, text);
            }
            return text;
        },
        _globalChildTransformers: [],
        registerElementTransform: function (transform) {
            ReactLike_._globalChildTransformers.push(transform);
        },
        _transformChild: function (tag, attrs, parent, child) {
            ReactLike_._globalChildTransformers.forEach(function (t) {
                child = t.transformChild(tag, attrs, parent, child);
            });
            if (isChildTransformer(tag)) {
                child = tag.transformChild(tag, attrs, parent, child);
            }
            return child;
        },
        // TODO: ChildAdder just like ChildTransformer, TextTransformer - a parent might want to cancel child append for some reason...
        _addChild: function (tag, attrs, element, toAppend) {
            if (isReactLikeChildAddTransformer(tag)) {
                tag.addChild(tag, attrs, element, toAppend);
            }
            else {
                element.appendChild(toAppend);
            }
        },
    };
    function isTextTransformer(n) {
        return n && n.transformText;
    }
    function isChildTransformer(n) {
        return n && n.transformChild;
    }
    function isReactLikeChildAddTransformer(n) {
        return n && n.addChild;
    }
    function isNode(n) {
        return n && n.nodeType;
    }
    function isReactLikeComponent(c) {
        return c.prototype && c.prototype.render;
    }
    self.ReactLike = ReactLike_;
    return ReactLike_;
});
