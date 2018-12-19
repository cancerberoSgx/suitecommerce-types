import { BackboneModel, BackboneFormView } from 'sc-types-frontend';
import { BindView } from 'sc-types-frontend-extras';

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

  fit('simple', () => {
    const v = new BindViewExample()
    v.$el = jQuery('<div></div>').appendTo('body');
    expect(v.$('.greet').length).toBe(0)
    v.render()
    expect(v.$('.greet').length).toBeGreaterThan(0)
    expect(v.$('.greet').text()).toContain(`This is an automatic message:`)
    v.$('.name').val('laura').change()
    expect(v.$('.greet').text()).toContain(`laura, how are you?`)
  })
})