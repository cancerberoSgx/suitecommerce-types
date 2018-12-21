import {expectType} from 'tsd-check';
import { View , Model, ViewConstructor, BackboneType} from '../src';

declare var Backbone:BackboneType
interface C1{foo:number}
interface M1 extends Model{m():string[]}
declare var VC1: ViewConstructor<View<C1, M1>>
describe('View', ()=>{
    it('constructor', ()=>{
        const view =new Backbone.View()
        expectType<View<C1, M1> >(new VC1());
        expectType<C1 >(new VC1().getContext());
        expectType<M1 >(new VC1().model);
    })
})