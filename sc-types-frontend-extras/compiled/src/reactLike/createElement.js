define('createElement', ['transformers', 'typeGuards', "tslib"], function (transformers, TypeGuards, tslib_1) {
    function getThis() {
        return self.ReactLike;
    }
    var Module = {
        supportFunctionAttributes: false,
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
                if (TypeGuards.isReactLikeComponent(tag)) {
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
                        if (getThis().supportFunctionAttributes) {
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
                if (TypeGuards.isNode(child)) {
                    var toAppend = transformers._transformChild(tag, originalAttrs, element, child);
                    _addChild(tag, originalAttrs, element, toAppend);
                }
                else if (Array.isArray(child)) {
                    child.forEach(function (c) {
                        if (!TypeGuards.isNode(c)) {
                            throw new Error('Child is not a node: ' + c + ', tag: ' + tag + ', originalAttrs: ' + originalAttrs);
                        }
                        var toAppend = transformers._transformChild(tag, originalAttrs, element, c);
                        _addChild(tag, originalAttrs, element, toAppend);
                    });
                }
                else {
                    var toAppend = document.createTextNode(transformers._transformText(tag, originalAttrs, element, child, child + ''));
                    _addChild(tag, originalAttrs, element, toAppend);
                }
            });
            return element;
        },
        _searchForThisView: function (el) {
            //heads up ! this is executed without context in the html element onclick handler this is why `(self as any).ReactLike`
            return el && el.__this || getThis()._searchForThisView(el.parentElement);
        },
        // TODO: ChildAdder just like ChildTransformer, TextTransformer - a parent might want to cancel child append for some reason...
        _addChild: _addChild,
    };
    function _addChild(tag, attrs, element, toAppend) {
        if (TypeGuards.isReactLikeChildAddTransformer(tag)) {
            tag.addChild(tag, attrs, element, toAppend);
        }
        element.appendChild(toAppend);
    }
    return Module;
});
