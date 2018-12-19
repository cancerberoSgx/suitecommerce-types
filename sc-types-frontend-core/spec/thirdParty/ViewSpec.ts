import { expectType } from 'tsd-check';
import { BackboneModel, BackboneView } from '../../src';

describe('View', () => {
  class Model1 extends BackboneModel {
    something() { }
    fetch(options: any): any { return jQuery.Deferred().resolve(2) }
  }
  interface View1Context {
    name: string
  }
  class View1 extends BackboneView<Model1, View1Context>{
    template = (c: View1Context) => ''
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
      return this.model.get('validation') + r
    }
  }

  it('generic view types', async done => {
    expectType<BackboneView<Model1, View1Context>>(new View1());
    expectType<View1Context>(new View1().getContext());
    expectType<Model1>(new View1().model);
    expectType<number>(await new View1().customValidation());
    done()
  })

  it('basic running example', async done => {
    const v = new View1()
    v.model.set('validation', 2)
    const r = await v.customValidation()
    expect(r).toBe(4)
    done()
  })


  describe('initialize and constructor', () => {
    it('constructor', async done => {
      class View2 extends BackboneView {
        constructor(foo: number) {
          super(foo as any)
          this.model = new BackboneModel({ foo })
          // this.model.set('foo', 2)
          // return this
        }
      }
      const v = new View2(2)
      expect(v.model.get('foo')).toBe(2)
      done()
    })

    it('initialize', async done => {
      class View3 extends BackboneView {
        // constructor(option?:any){
        //   super(option)
        // }
        initialize(option?:any) {
          // super.initialize(option)
          this.model = new BackboneModel({ foo: 3 })
          // this.model.set('foo', 3)
        }
      }
      const v = new View3()
      expect(v.model.get('foo')).toBe(3)
      done()
    })

    it('initialize with options', async done => {
      class Model3 extends BackboneModel {
        // initialize(attributes:any, options:any) {
        //   super.initialize(attributes, options)
        // }
      }
      class View3 extends BackboneView<Model3>{
        initialize(m:Model3) {
          // super.initialize(options)
          this.model = m
        }
      }
      expect(new View3(new Model3({ foo: 5 })).model.get('foo')).toBe(5)
      done()
    })
  })

  describe('events', () => {
    it('model events', async done => {
      class View5 extends BackboneView<BackboneModel>{
        foo(arg0: number): any {
          setTimeout(() => {
            this.model.set('foo', arg0)
          }, 100);
        }
        initialize(options: any) {
          super.initialize(options)
          this.model.on('change', function () {
            expect(v.model.get('foo')).toBe(6)
            done()
          })
        }
      }
      const v = new View5({ model: new BackboneModel({ foo: 5 }) })
      expect(v.model.get('foo')).toBe(5)
      v.foo(6)
      expect(v.model.get('foo')).toBe(5)
    })
  })
})