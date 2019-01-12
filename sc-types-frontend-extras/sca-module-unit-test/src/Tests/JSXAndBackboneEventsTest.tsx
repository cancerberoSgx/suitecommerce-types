import { MouseEvent } from 'react';
import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike } from 'sc-types-frontend-extras';

export default describe('JSXView and Backbone', () => {

  class Model1 extends BackboneModel {

  }

  interface Context1 extends TemplateContext {
    name: string
  }

  class ViewJSXAndBackboneEvents extends JSXView<Model1, Context1> {

    counter = ''
    jsxTemplate = context => <div>
      <div className="view1">Name: {context.name}</div>
      <button className="clickme1">clickme1</button>
      <button className="clickme2">clickme2</button>
    </div>

    events() {
      return {
        'click .clickme1': this.clickme1.bind(this),
        'click .clickme2': 'clickme2'
      }
    }

    clickme1(e: MouseEvent) {
      e.preventDefault()
      this.counter = 'clickme1'
    }

    clickme2(e: MouseEvent) {
      e.preventDefault()
      this.counter = 'clickme2'
    }

  }

  describe('Backbone events', () => {

    let view1: ViewJSXAndBackboneEvents

    beforeEach(() => {
      view1 = new ViewJSXAndBackboneEvents()
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

    it('should handle event declared with backbone giving functions', () => {
      view1.render()
      expect(view1.$('.clickme1').length).toBeGreaterThan(0)
      expect(view1.counter).toBe('')
      view1.$('.clickme1').click()
      expect(view1.counter).toBe('clickme1')
    })

    it('should handle event declared with backbone giving method names', () => {
      view1.render()
      expect(view1.$('.clickme2').length).toBeGreaterThan(0)
      expect(view1.counter).toBe('')
      view1.$('.clickme2').click()
      expect(view1.counter).toBe('clickme2')
    })

  })

})