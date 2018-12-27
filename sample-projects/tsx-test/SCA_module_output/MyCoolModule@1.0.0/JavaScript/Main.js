"use strict";

define('Main', ['ReactLike'], function (ReactLike) {
    return ReactLike.createElement("div", { id: "foo" },
        ReactLike.createElement("span", { className: "unique-unique123" }, "Hello, world!"),
        ReactLike.createElement("button", { onClick: function (e) { return alert("hi!"); } }, "Click Me"));
});
