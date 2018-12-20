define('strings', [], function () {
    return {
        expectTextEquals: function (a, b, debug) {
            if (debug === void 0) { debug = false; }
            !debug && console.log(a, b);
            if (!a || !b)
                return false;
            expect(a.replace(/\s+/gm, ' ').trim()).toEqual(b.replace(/\s+/gm, ' ').trim());
        },
        expectTextToContain: function (a, b, debug) {
            if (debug === void 0) { debug = false; }
            !debug && console.log(a, b);
            if (!a || !b)
                return false;
            expect(a.replace(/\s+/gm, ' ').trim()).toContain(b.replace(/\s+/gm, ' ').trim());
        },
        expectTextNotToContain: function (a, b, debug) {
            if (debug === void 0) { debug = false; }
            !debug && console.log(a, b);
            if (!a || !b)
                return false;
            expect(a.replace(/\s+/gm, ' ').trim()).not.toContain(b.replace(/\s+/gm, ' ').trim());
        }
    };
});
