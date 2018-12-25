import { expectType } from 'tsd-check';
import { View, BackboneModel, BackboneView } from '../src';

describe('View', () => {
  it('generic views', async done => {
    class Model1 extends BackboneModel {
      something() { }
    }
    interface View1Context {
      name: string
    }
    class View1 extends BackboneView<Model1, View1Context>{
      template = c => ''
      events = <any>{
        '[data-action="validate"]': 'customValidation'
      }
      getContext() {
        return {
          name: 'as'
        }
      }
      model = new Model1()
      async customValidation(e: MouseEvent): Promise<boolean> {
        await this.model.fetch()
        await this.render()
        return this.model.get('validation')
      }
    }
    expectType<BackboneView<Model1, View1Context> >(new View1());
    expectType<View1Context>(new View1().getContext());
    expectType<Model1>(new View1().model);
    expectType<boolean>(await new View1().customValidation(null));
  })
})