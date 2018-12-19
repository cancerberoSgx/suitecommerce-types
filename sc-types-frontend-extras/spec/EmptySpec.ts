import { expectType } from 'tsd-check';

describe('empty', () => {
  it('empty spec', () => {
    interface I { a: number }
    interface J extends I { b: string }
    type X = Partial<I> & Partial<J>
    expectType<X>({ a: 1 });
    expect(true).toBe(true)
  })
})