import { expectCompileFail, expectCompileSuccess } from './testUtil';

describe('TypedBackboneModel typings', () => {

  it('one single incorrect attribute should fail', () => {
    expectCompileFail({
      code: `
    import {TypedBackboneModel} from '.'
    interface A {name:string}
    class M extends TypedBackboneModel<A>{}
    const m = new M()
    m.setAttributes({foo:1})
    `,
      expectErrorMsgToContain: `Object literal may only specify known properties, and 'foo' does not exist in type`
    })
  })

  it('one correct and one incorrect property should fail', () => {
    expectCompileFail({
      code: `
  import {TypedBackboneModel} from '.'
  interface A {name:string}
  class M extends TypedBackboneModel<A>{}
  const m = new M()
  m.setAttributes({name: 'sd', foo:1})
  `,
      expectErrorMsgToContain: `Object literal may only specify known properties, and 'foo' does not exist in type`
    })
  })

  it('one correct attribute should fail', () => {
    expectCompileSuccess({
      code: `
  import {TypedBackboneModel} from '.'
  interface A {name:string}
  class M extends TypedBackboneModel<A>{}
  const m = new M()
  m.setAttributes({name:'123'})
  `,
      emittedCodeToContain: `m.setAttributes({ name: '123' }); `
    })
  })


  describe('getAttribute', () => {

    expectCompileFail({
      it: 'incorrect property name should fail',
      code: `
  import {TypedBackboneModel} from '.'
  interface A {existent: number}
  class M extends TypedBackboneModel<A>{}
  const m = new M()
  m.getAttribute('notExistent')
  `,
      expectErrorMsgToContain: `Argument of type '"notExistent"' is not assignable to parameter of type '"existent"'`
    })

    expectCompileFail({
      it: 'incorrect return type should fail',
      code: `
  import {TypedBackboneModel} from '.'
  interface A {existent: number}
  class M extends TypedBackboneModel<A>{}
  const m = new M()
  const r: string = m.getAttribute('existent')
  `,
      expectErrorMsgToContain: `Type 'number' is not assignable to type 'string'`
    })
  })


})

// import {TypedBackboneModel} from '../src'
// // import {TypedBackboneModel} from '.'
// interface A {name:string}
// class M extends TypedBackboneModel<A>{}
// const m = new M()
// m.setAttributes({foo:1})
