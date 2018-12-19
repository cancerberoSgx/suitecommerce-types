// skipped because it fails to execute in node - must add jsdom and libraries

import { expectType } from 'tsd-check';
//@ts-ignore
import { TypedBackboneModel } from '../src'

describe('TypedBackboneModel type checking getAttribute', () => {

  it('should cast automatically', () => {
    interface A {
      age: number
      name: string
    }
    class M extends TypedBackboneModel<A>{ }
    const m = new M()
//@ts-ignore
    expectType<number>(m.getAttribute('age'));
//@ts-ignore
    expectType<string>(m.getAttribute('name'));
  })
})