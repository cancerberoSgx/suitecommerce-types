import { expectType } from 'tsd-check';
import { View, BackboneModel, BackboneView } from '../src';
import * as jQuery from 'jQuery'

describe('View', () => {
  class Model1 extends BackboneModel {
    something() { }
    fetch(options: any):any{return jQuery.Deferred().resolve(2)}
  }
  interface View1Context {
    name: string
  }
  class View1 extends BackboneView<Model1, View1Context>{
    template = () => ''
    events = <any>{
      '[data-action="validate"]': 'customValidation'
    }
    getContext() {
      return {
        name: 'as'
      }
    }
    model = new Model1()
    async customValidation(e?: MouseEvent): Promise<number> {
      const r = await this.model.fetch('')
      await this.render()
      return this.model.get('validation')+r
    }
  }

  it('generic views', async done => {
   
    expectType<BackboneView<Model1, View1Context> >(new View1());
    expectType<View1Context>(new View1().getContext());
    expectType<Model1>(new View1().model);
    expectType<number>(await new View1().customValidation(null));
    done()
  })

  it('runs', async done=>{
    const v = new  View1()
    v.model.set('validation', 2)
    const r = await v.customValidation()
    expect(r).toBe(4)
    done()
  })
})