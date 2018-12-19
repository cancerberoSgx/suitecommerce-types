import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike, JSXComponent, ReactNode, MouseEvent } from 'sc-types-frontend-extras';

export default fdescribe('jsx component class', () => {


  describe('JSXComponent', () => {
  

    xit('should be able to use it alone without Backbone View at all', () => {
    })

    it('should render using a parent JSXView', () => {
      class MyComponent1 extends JSXComponent<{ foo: number }> {
        render(): ReactNode {
          return <div className="comp1">jojojo: {this.props.foo}</div>
        }
      }
      expect(document.querySelectorAll('.comp1').length).toBe(0)
      interface C extends TemplateContext { }
      class View1 extends JSXView<BackboneModel, C> {
        jsxTemplate = (context: C) => <div> <MyComponent1 foo={123} /></div>
      }
      const view1 = new View1()
      view1.$el = jQuery('<div></div>').appendTo('body');
      view1.render()
      expect(document.querySelectorAll('.comp1').length).toBe(1)
      expect(document.querySelectorAll('.comp1')[0].innerHTML).toBe("jojojo: 123")
    })


    fit('should support function attributes always', () => {
      class MyComponent1 extends JSXComponent<{ foo: number }> {
        render(): ReactNode {
          const self = this
          return <div>Foo: {this.props.foo}
            <button className="clickme" onClick={e=>self.clicked(e)}>clickme</button>
          </div>
        }
        clicked(e: MouseEvent) {
          console.log('clicked')
        }
      }
      expect(document.querySelectorAll('.clickme').length).toBe(0)
      // interface C extends TemplateContext { }
      ReactLike.supportFunctionAttributes=true
      class View1 extends JSXView<BackboneModel, {}> {
        supportsFunctionAttributes: true
        jsxTemplate = context => <div> <MyComponent1 foo={123} /></div>
      }
      const view1 = new View1()
      view1.$el = jQuery('<div></div>').appendTo('body')
      view1.render()
      expect(document.querySelectorAll('.clickme').length).toBe(1)
      expect(document.querySelectorAll('.clickme')[0].innerHTML).toBe("clickme")
      // debugger
      // view1.destroy()
    })



    xit('should be compatible with other JSXComponents and jsx stateless custom tags', () => {
    })

    xit('should be compatible with BackboneView ', () => {
    })
    xit('should be compatible with BackboneModel as state', () => {
    })
    xit('should be a JSXView so its a BackboneView', () => {
    })
  })



  describe('Component class first research', () => {
    class BaseComponent<P={}, S={}> {
      constructor(props: Readonly<P>) {
        this.props = props
      }
      render(): ReactNode {
        return null
      }
      context: any
      setState(
        state: S,
        callback?: () => void
      ): void {
      } s
      readonly props: Readonly<{ children?: ReactNode }> & Readonly<P>;
      state: Readonly<S>;
      refs: any = null
      forceUpdate(callBack?: () => void): void { }
    }
    class MyComponent extends BaseComponent<{ foo: number }> {
      render(): ReactNode {
        return <div className="myComponent">jojojo: {this.props.foo}</div>
      }
    }
    it('should be able to work with react-like state-components without react', () => {
      expect(document.querySelectorAll('.myComponent').length).toBe(0)
      interface C extends TemplateContext { }
      class View1 extends JSXView<BackboneModel, C> {
        jsxTemplate = (context: C) => <div> <MyComponent foo={123} /></div>
      }
      const view1 = new View1()
      view1.$el = jQuery('<div></div>').appendTo('body');
      view1.render()
      expect(document.querySelectorAll('.myComponent').length).toBe(1)
      view1.destroy()
    })
  })

})
