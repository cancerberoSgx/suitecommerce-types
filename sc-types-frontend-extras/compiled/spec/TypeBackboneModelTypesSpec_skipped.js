"use strict";
// skipped because it fails to execute in node - must add jsdom and libraries
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tsd_check_1 = require("tsd-check");
//@ts-ignore
var src_1 = require("../src");
describe('TypedBackboneModel type checking getAttribute', function () {
    it('should cast automatically', function () {
        var M = /** @class */ (function (_super) {
            tslib_1.__extends(M, _super);
            function M() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return M;
        }(src_1.TypedBackboneModel));
        var m = new M();
        //@ts-ignore
        tsd_check_1.expectType(m.getAttribute('age'));
        //@ts-ignore
        tsd_check_1.expectType(m.getAttribute('name'));
    });
});
