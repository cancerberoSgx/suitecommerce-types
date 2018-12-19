define('render', ['ReactLike'], function (ReactLikeRender) {
    return {
        renderDOM: function (parent, el) {
            parent.appendChild(el);
        },
        renderJQuery: function (parent, el) {
            parent.append(jQuery(el));
        }
    };
});
