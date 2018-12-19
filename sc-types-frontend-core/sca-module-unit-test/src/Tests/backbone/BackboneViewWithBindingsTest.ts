import { BackboneModel, BackboneView, BackboneFormView } from "sc-types-frontend";

export default describe('View', () => {
  interface Context {
    completeDescription: string
    name: string
    lastName: string
    age: number
  }
  class Model extends BackboneModel<Context> {}
  class View1 extends BackboneView<Model, Context>{
    template = (c: Context) => `
      <button class="button" id="button111">increment current age <span data-bind="age"></span></button><br/>
      <label>Name<input data-bind="name"></input></label><bR/>
      <label>Last name: <input data-bind="lastName"></input></label><br/>
      <label>Age: <input data-bind="age" type="number"></input></label><br/>
      <p>Description: <span data-bind="completeDescription"></span></p>
    `
    events = <any>{
      'click .button': ()=>this.model.set('age', this.model.get('age') + 1)
    }
    bindings = {
      '[data-bind="name"]': 'name',
      '[data-bind="lastName"]': 'lastName',
      '[data-bind="age"]': 'age',
      '[data-bind="completeDescription"]': 'completeDescription'
    }
    private buildCompleteDescription(d: Partial<Context>){
      return `A person named ${d.name||'unknown'} ${d.lastName||'unknown'} with ${d.age||'unknown'} years`
    }
    initialize(){
      super.initialize()
      const initData = {name: 'seba', age: 2, lastName: 'gurin'}
      this.model=new Model({...initData, completeDescription: this.buildCompleteDescription(initData)})
      BackboneFormView.add(this, {noCloneModel: true});
      this.model.on('change:name change:lastName change:age', ()=>{
        this.model.set('completeDescription', this.buildCompleteDescription(this.getContext()))
      });
    }
    getContext() {
      return this.model.attributes
    }
  }

  it('basic running example', async done => {
    const v = new View1()
    expect(jQuery('#button111').length).toBe(0)
    jQuery('#main').show()
    v.$el = jQuery('<div></div>').appendTo('body')
    v.render()
    expect(jQuery('#button111').length).not.toBe(0)
    expect(jQuery('[data-bind="completeDescription"]').text()).toContain('A person named seba gurin with 2 years')
    jQuery('#button111').click()
    expect(jQuery('[data-bind="completeDescription"]').text()).toContain('A person named seba gurin with 3 years')
    jQuery('[data-bind="name"]').val('laura').change()
    expect(jQuery('[data-bind="completeDescription"]').text()).toContain('A person named laura gurin with 3 years')
    // expect(jQuery('.button').text()).toBe('otro0')
    // jQuery('.button').click()
    // expect(jQuery('.button').text()).toBe('otro1')

    done()
  })

})