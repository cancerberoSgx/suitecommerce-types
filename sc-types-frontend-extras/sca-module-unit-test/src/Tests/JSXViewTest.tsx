import { jQuery, BackboneModel, TemplateContext } from 'sc-types-frontend'
import { JSXView, ReactLike } from 'sc-types-frontend-extras'
import { MouseEvent, ChangeEvent, FormEvent } from 'react';

export default describe('JSXView', () => {

  class Model1 extends BackboneModel {

  }

  interface Context1 extends TemplateContext {
    name: string
  }

  class ViewWithEventAttributesReferencingThisDontWork extends JSXView<Model1, Context1> {

    counter = ''

    jsxTemplate = context => <div>
      <div className="view1">Name: {context.name}</div>
      <button className="functionAttributeMethodCall1" onClick={e => this.clicked1(e)}>e=>this.clicked(e) works with supportsFunctionAttributes = true</button>
      <button className="functionAttributeInline" onClick={e => {
        e.preventDefault()
        console.log('clicked', e.button, e.clientX, this.cid);
        this.counter = 'functionAttributeInline'
      }}>e=>with no references works but not useful</button>
      <button className="functionAttributeBound" onClick={this.clicked3.bind(this)}>this.clicked.bind(this) don't work at all</button>
      <button className="functionAttributeDirectly" onClick={this.clicked2}>this.clicked will work and this will be automatically bind</button>

      <input onInput={e => this.changed(e)}></input>
    </div>

    supportsFunctionAttributes = true

    clicked1(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      console.log('clicked', e.button, e.clientX, this.cid);
      this.counter = 'functionAttributeMethodCall1'
    }  

    clicked2(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      console.log('clicked', e.button, e.clientX, this.cid);
      this.counter = 'functionAttributeDirectly'
    }    

    clicked3(e: MouseEvent<HTMLButtonElement>, type:string) {
      e.preventDefault()
      console.log('clicked', e.button, e.clientX, this.cid);
      this.counter = 'functionAttributeBound'
    }

    changed(e: FormEvent<HTMLInputElement>) {
      console.log('changed', e.currentTarget.value, this.cid);
    }


  }

  let view1: ViewWithEventAttributesReferencingThisDontWork

  beforeEach(() => {
    view1 = new ViewWithEventAttributesReferencingThisDontWork()
    view1.$el = jQuery('<div></div>').appendTo('body')
  })

  afterEach(() => {
    view1.destroy()
  })

  it('should render', () => {
    const selector = '.view1'
    expect(document.querySelector(selector)).toBeFalsy()
    view1.render()
    expect(document.querySelector(selector)).toBeTruthy()
  })

  it('should handle attribute event handlers written inline', () => {
    view1.render()
    expect(view1.$('.functionAttributeInline').length).toBeGreaterThan(0)
    expect(view1.counter).toBe('')
    view1.$('.functionAttributeInline').click()
    expect(view1.counter).toBe('functionAttributeInline')
  })  
  
  
  it('should handle attribute event handlers calling a method', () => {
    view1.render()
    expect(view1.$('.functionAttributeMethodCall1').length).toBeGreaterThan(0)
    expect(view1.counter).toBe('')
    view1.$('.functionAttributeMethodCall1').click()
    expect(view1.counter).toBe('functionAttributeMethodCall1')
  })
  
  it('should handle attribute event handlers referencing method directly', () => {
    view1.render()
    expect(view1.$('.functionAttributeDirectly').length).toBeGreaterThan(0)
    expect(view1.counter).toBe('')
    view1.$('.functionAttributeDirectly').click()
    expect(view1.counter).toBe('functionAttributeDirectly')
  })

  xit('should handle attribute event handlers method bound', () => { // it doesn't work because fn.bind is a native code not printable
    view1.render()
    expect(view1.$('.functionAttributeBound').length).toBeGreaterThan(0)
    expect(view1.counter).toBe('')
    view1.$('.functionAttributeBound').click()
    expect(view1.counter).toBe('functionAttributeBound')
  })
})