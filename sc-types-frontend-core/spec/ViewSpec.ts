import {expectType} from 'tsd-check';
import { View , Model, ViewConstructor, BackboneType} from '../src';

declare var Backbone:BackboneType
interface C1{foo:number}
interface M1 extends Model{m():string[]}
// declare var V1: View<C1, M1>
declare var VC1: ViewConstructor
describe('View', ()=>{
    it('constructor', ()=>{
        const view =new Backbone.View()
        // expectType<View<{}, undefined> >(new (BackboneView(backboneObject))());
        expectType<View<C1, M1> >(new VC1<C1, M1>());
        // expectType<View<C1, M1> >(new (BackboneView<View<C1, M1>>(backboneObject))());
        expectType<C1 >(new VC1<C1, M1>().getContext());
        expectType<M1 >(new VC1<C1, M1>().model);
    })
})