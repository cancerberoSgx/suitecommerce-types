"use strict";
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore

//@ts-ignore
define('CoolFeature56MainViewTemplate', ['ReactLike'], function (ReactLike) {
    return function (context) {
        return ReactLike.createElement("div", { className: "jojojo" },
            ReactLike.createElement("p", null,
                context.name,
                " dreams are: "),
            ReactLike.createElement("ul", null, context.dreams.map(function (dream) {
                return ReactLike.createElement("li", null,
                    ReactLike.createElement("strong", null, dream.name),
                    ": ",
                    dream.description);
            })));
    };
});
