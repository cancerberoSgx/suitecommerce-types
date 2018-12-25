import {expectType} from 'tsd-check';
import { View , BackboneModel, BackboneView} from '../src';

// declare var Backbone:BackboneType
// interface C1{foo:number}
// interface M1 extends Model{m():string[]}
// declare var VC1: ViewConstructor<View<C1, M1>>
describe('View', ()=>{
    // it('constructor', ()=>{
    //     const view =new Backbone.View()
    //     expectType<View<C1, M1> >(new VC1());
    //     expectType<C1 >(new VC1().getContext());
    //     expectType<M1 >(new VC1().model);
    // })

    it('f', async done =>{

    //  interface Simple1ListView extends View{
    //     customValidation(e?:MouseEvent): Promise<boolean>
    //     model:Model
    // }
    
    class Model1 extends BackboneModel {
      something(){}
    }
    interface View1Context {
      name: string
    }
     class View1 extends  BackboneView<Model1, View1Context>{
        template= c=>''
        events = <any>{
            '[data-action="validate"]': 'customValidation'
        }
        getContext() {
            return {
                name: 'as'
            }
        }
        model= new Model1()
        async customValidation(e:MouseEvent): Promise<boolean>{
            await this.model.fetch()
            await this.render()
            return this.model.get('validation')
        }
      }

      const v = new View1()
      v.customValidation(null).then(done)
      // done()
    })
})