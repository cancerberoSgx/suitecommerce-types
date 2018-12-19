"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testUtil_1 = require("./testUtil");
describe('TypedBackboneModel typings', function () {
    it('one single incorrect attribute should fail', function () {
        testUtil_1.expectCompileFail({
            code: "\n    import {TypedBackboneModel} from '.'\n    interface A {name:string}\n    class M extends TypedBackboneModel<A>{}\n    const m = new M()\n    m.setAttributes({foo:1})\n    ",
            expectErrorMsgToContain: "Object literal may only specify known properties, and 'foo' does not exist in type"
        });
    });
    it('one correct and one incorrect property should fail', function () {
        testUtil_1.expectCompileFail({
            code: "\n  import {TypedBackboneModel} from '.'\n  interface A {name:string}\n  class M extends TypedBackboneModel<A>{}\n  const m = new M()\n  m.setAttributes({name: 'sd', foo:1})\n  ",
            expectErrorMsgToContain: "Object literal may only specify known properties, and 'foo' does not exist in type"
        });
    });
    it('one correct attribute should fail', function () {
        testUtil_1.expectCompileSuccess({
            code: "\n  import {TypedBackboneModel} from '.'\n  interface A {name:string}\n  class M extends TypedBackboneModel<A>{}\n  const m = new M()\n  m.setAttributes({name:'123'})\n  ",
            emittedCodeToContain: "m.setAttributes({ name: '123' }); "
        });
    });
    describe('getAttribute', function () {
        testUtil_1.expectCompileFail({
            it: 'incorrect property name should fail',
            code: "\n  import {TypedBackboneModel} from '.'\n  interface A {existent: number}\n  class M extends TypedBackboneModel<A>{}\n  const m = new M()\n  m.getAttribute('notExistent')\n  ",
            expectErrorMsgToContain: "Argument of type '\"notExistent\"' is not assignable to parameter of type '\"existent\"'"
        });
        testUtil_1.expectCompileFail({
            it: 'incorrect return type should fail',
            code: "\n  import {TypedBackboneModel} from '.'\n  interface A {existent: number}\n  class M extends TypedBackboneModel<A>{}\n  const m = new M()\n  const r: string = m.getAttribute('existent')\n  ",
            expectErrorMsgToContain: "Type 'number' is not assignable to type 'string'"
        });
    });
});
