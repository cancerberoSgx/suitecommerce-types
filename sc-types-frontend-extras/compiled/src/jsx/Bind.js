define('Bind', ['ReactLike'], function (ReactLike) {
    /**
     * Support JSX <Bind> tag to declare bindings with like:
    `<Bind name="age"><input type="number"></input></Bind>`
    which should output should something like this:
    `<input type="text" data-bind="age"></input>`.
    
    Uses `ReactLike.transformChild` feature
     */
    var _Bind = function _Bind(prop) {
        return ReactLike.createElement("span", { "data-type": "bind" });
    };
    _Bind.transformChild = function (tag, attrs, parent, child) {
        if (attrs.name && isHTMLElement(child)) {
            child.setAttribute('data-bind', attrs.name);
        }
        return child;
    };
    function isHTMLElement(n) {
        return n && n.nodeType === 1 && n.outerHTML;
    }
    return _Bind;
});
