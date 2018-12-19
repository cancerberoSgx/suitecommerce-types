"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsd_check_1 = require("tsd-check");
xdescribe('empty', function () {
    it('empty spec', function () {
        tsd_check_1.expectType({ a: 1 });
        expect(true).toBe(true);
    });
});
