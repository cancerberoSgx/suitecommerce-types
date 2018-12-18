// import { FormEvent, MouseEvent } from 'react';
import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike, MouseEvent, FormEvent } from 'sc-types-frontend-extras';

export default describe('JSXView alone', () => {

  class Model1 extends BackboneModel {

  }

  interface Context1 extends TemplateContext {
    name: string
  }

  class ViewWithEventAttributesReferencingThisDontWork extends JSXView<Model1, Context1> {

    counter = ''
    supportsFunctionAttributes = true

    jsxTemplate = context => <div>
      <div className="view1">Name: {context.name}</div>
      <button className="functionAttributeMethodCall1" onClick={e => this.clicked1(e)}>e=>this.clicked(e) works with supportsFunctionAttributes = true</button>
      <button className="functionAttributeInline" onClick={e => {
        e.preventDefault()
        console.log('clicked', e.button, e.clientX, this.cid);
        this.counter = 'functionAttributeInline'
      }}>e=>inline implementation with references to this should work</button>
      <button className="functionAttributeBound" onClick={this.clicked3.bind(this)}>this.clicked.bind(this) don't work at all</button>
      <button className="functionAttributeDirectly" onClick={this.clicked2}>this.clicked will work and this will be automatically bind</button>
      <button className="functionAttributeInlineNoRefs" onClick={e => {
        e.preventDefault(); 
        console.log('clicked'); 
        (window as any).externalCounter = 'functionAttributeInlineNoRefs'
      }}>inline fn attribute with no references to scope (this) should always work</button>
      <input onInput={e => this.changed(e)}></input>
    </div>

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

    clicked3(e: MouseEvent<HTMLButtonElement>, type: string) {
      e.preventDefault()
      console.log('clicked', e.button, e.clientX, this.cid);
      this.counter = 'functionAttributeBound'
    }

    changed(e: FormEvent<HTMLInputElement>) {
      console.log('changed', e.currentTarget.value, this.cid);
    }
  }

  describe('function attributes', () => {

    let view1: ViewWithEventAttributesReferencingThisDontWork

    beforeEach(() => {
      view1 = new ViewWithEventAttributesReferencingThisDontWork()
      view1.$el = jQuery('<div></div>').appendTo('body');
      (window as any).externalCounter = ''
      ReactLike.supportFunctionAttributes = true
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

    it('should handle attribute event handlers written inline without refs to scope or this', () => {
      view1.render()
      expect(view1.$('.functionAttributeInlineNoRefs').length).toBeGreaterThan(0)
      expect((window as any).externalCounter).toBe('')
      view1.$('.functionAttributeInlineNoRefs').click()
      expect((window as any).externalCounter).toBe('functionAttributeInlineNoRefs')
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

    xit('should handle function attribute bound to this', () => { // it doesn't work because fn.bind is a native code not printable
      view1.render()
      expect(view1.$('.functionAttributeBound').length).toBeGreaterThan(0)
      expect(view1.counter).toBe('')
      view1.$('.functionAttributeBound').click()
      expect(view1.counter).toBe('functionAttributeBound')
    })

    it('if ReactLike.supportFunctionAttributes is falsy then fn attributes must be disabled', () => {
      view1.supportsFunctionAttributes = true
      ReactLike.supportFunctionAttributes = false
      view1.render()
      const h = view1.$el.get(0).outerHTML
      expect(h).not.toContain('ReactLike._searchForThisView(this)')
    })

    it('if view.supportsFunctionAttributes is false then fn attributes must be disabled', () => {
      view1.supportsFunctionAttributes = false
      view1.render()
      expect(view1.$('.functionAttributeInline').length).toBeGreaterThan(0)
      expect(view1.counter).toBe('')
      view1.$('.functionAttributeInline').click()
      expect(view1.counter).toBe('')

      expect(view1.$('.functionAttributeDirectly').length).toBeGreaterThan(0)
      expect(view1.counter).toBe('')
      view1.$('.functionAttributeDirectly').click()
      expect(view1.counter).toBe('')

    })

  })

})