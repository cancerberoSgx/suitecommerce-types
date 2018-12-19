import { BackboneModel } from 'sc-types-frontend';
import { BindView, ReactLike, JSXBindView, Bind, ReactLikeChildAddTransformer } from 'sc-types-frontend-extras';


export default describe('BindView', () => {

  interface Context1 {
    name: string
    greet?: string
  }
  class Model1 extends BackboneModel<Context1>{ }
  class BindViewExample extends BindView<Model1, Context1> {
    template = (c: Context1) => `
      <label>Name<input class="name" ${this.bindAttribute('name')}></input></label><bR/>
      <p class="greet">This is an automatic message: <span ${this.bindAttribute('greet')}></span> -- end. </p>
    `
    initialize() {
      super.initialize()
      this.model = new Model1({ name: 'seba', greet: '' })
      this.model.on('change', () => {
        this.model.set('greet', `Hello ${this.model.get('name')}, how are you?`)
      })
    }
  }

  it('simple', () => {
    const v = new BindViewExample()
    v.$el = jQuery('<div></div>').appendTo('body');
    expect(v.$('.greet').length).toBe(0)
    v.render()
    expect(v.$('.greet').length).toBeGreaterThan(0)
    expect(v.$('.greet').text()).toContain(`This is an automatic message:`)
    v.$('.name').val('laura').change()
    expect(v.$('.greet').text()).toContain(`laura, how are you?`)
    v.destroy()
  })


  describe('JSXBindView', () => {
    interface TheContext {
      name: string
      greet?: string
    }
    class TheModel extends BackboneModel<TheContext>{ }
    class JSXBindViewExample extends JSXBindView<TheModel, TheContext> {
      jsxTemplate = (c: TheContext) =>
        <div>
          <div>Name: <Bind name="name"><input className="name"></input></Bind></div>
          <div className="greet">
            This is an automatic message:
            <Bind name="greet"><span></span></Bind>-- end.
            </div>
        </div>
      initialize() {
        super.initialize()
        this.model = new TheModel({ name: 'seba', greet: '' })
        this.model.on('change', () => {
          this.model.set('greet', `Hello ${this.model.get('name')}, how are you?`)
        })
      }
    }
    it('simple', () => {
      const v = new JSXBindViewExample()
      v.$el = jQuery('<div></div>').appendTo('body');
      expect(v.$('.greet').length).toBe(0)
      v.render()
      expect(v.$('.greet').length).toBeGreaterThan(0)
      expect(v.$('.greet').text()).toContain(`This is an automatic message:`)
      v.$('.name').val('laura').change()
      expect(v.$('.greet').text()).toContain(`laura, how are you?`)
      v.destroy()
    })


    it('Bind JSX tag initial research', () => {
      // the idea is to be able to declare bindings with jsx like:
      // <Bind name="age"><input type="number"></input></Bind>
      // the output should be equivalent to a BindView template like:
      // <input type="text" ${this.bindAttribute('name')}></input>
      // or the final result:
      // <input type="text" data-bind="age"></input>
      interface BindProps {
        name: string
        children: JSX.Element
      }

      function Bind(prop: BindProps): JSX.Element {
        return <div data-type="bind"></div>
      }
      (Bind as any as ReactLikeChildAddTransformer).addChild = (tag: any, attrs: any, parent: HTMLElement, child: HTMLElement) => {
        if (attrs.name) {
          child.setAttribute('data-bind', attrs.name);
        }
        return child
      }


      expect(jQuery('#name132').attr('data-bind')).not.toBe('foo')
      const f = <Bind name="foo"><input id="name132"></input></Bind>
      const parent = jQuery('<div></div>').appendTo('body')
      ReactLike.renderJQuery(parent, f)
      expect(jQuery('#name132').attr('data-bind')).toBe('foo')
      parent.remove()
    })

  })
})