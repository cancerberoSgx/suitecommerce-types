import { expectType } from 'tsd-check';
import { BackboneModel, BackboneView } from '../../src';
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

  it('generic view types', async done => {
    expectType<BackboneView<Model1, View1Context> >(new View1());
    expectType<View1Context>(new View1().getContext());
    expectType<Model1>(new View1().model);
    expectType<number>(await new View1().customValidation(null));
    done()
  })

  it('basic running example', async done=>{
    const v = new  View1()
    v.model.set('validation', 2)
    const r = await v.customValidation()
    expect(r).toBe(4)
    done()
  })
  

  describe('initialize and constructor', ()=>{
    it('constructor', async done => {
      class View2 extends BackboneView{
        constructor(foo:number){
          super()
          this.model=new BackboneModel({foo})
        }
      }
      expect(new View2(2).model.get('foo')).toBe(2)
      done()
    })
    it('initialize', async done => {
      class View3 extends BackboneView{
        initialize(){
          this.model=new BackboneModel({foo: 3})
        }
      }
      expect(new View3().model.get('foo')).toBe(3)
      done()
    })

    xit('initialize with options', async done => {
      class Model3 extends BackboneModel{
        initialize(attributes, options){
          super.initialize(attributes, options)
        }
      }
      class View3 extends BackboneView<Model3>{
        initialize(options){
          super.initialize(options)
        }
      }
      expect(new View3(new Model3({foo: 5})).model.get('foo')).toBe(5)
      done()
    })
  })

  xdescribe('events', ()=>{
    it('model events', async done => {
      let f:string
      // debugger
      class View5 extends BackboneView<BackboneModel>{
        foo(arg0: number): any {
          this.model.set('foo', arg0)
        }
        initialize(options){
          super.initialize(options)
          // this.model=new BackboneModel({foo: 5})
          this.model.on('change', function(model, ){
            debugger
          })
        }
      }
      const v =new View5({model:new BackboneModel({foo: 5})})
      expect(v.model.get('foo')).toBe(5)
      v.foo(6)

      // expect(v.model.get('foo')).toBe(5)
      // done()
    })
  })
})