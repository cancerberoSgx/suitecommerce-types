// import { FormEvent, MouseEvent } from 'react';
// import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
// import { JSXView, ReactLike } from 'sc-types-frontend-extras';

// export default describe('JSXView alone', () => {

//   describe('function attributes', () => {

//     let view1: ViewWithEventAttributesReferencingThisDontWork

//     beforeEach(() => {
//       view1 = new ViewWithEventAttributesReferencingThisDontWork()
//       view1.$el = jQuery('<div></div>').appendTo('body');
//       (window as any).externalCounter = ''
//       ReactLike.supportFunctionAttributes = true
//     })

//     afterEach(() => {
//       view1.destroy()
//     })

//     it('should render', () => {
//       const selector = '.view1'
//       expect(document.querySelector(selector)).toBeFalsy()
//       view1.render()
//       expect(document.querySelector(selector)).toBeTruthy()
//     })

//     it('should handle attribute event handlers written inline', () => {
//       view1.render()
//       expect(view1.$('.functionAttributeInline').length).toBeGreaterThan(0)
//       expect(view1.counter).toBe('')
//       view1.$('.functionAttributeInline').click()
//       expect(view1.counter).toBe('functionAttributeInline')
//     })

//     it('should handle attribute event handlers written inline without refs to scope or this', () => {
//       view1.render()
//       expect(view1.$('.functionAttributeInlineNoRefs').length).toBeGreaterThan(0)
//       expect((window as any).externalCounter).toBe('')
//       view1.$('.functionAttributeInlineNoRefs').click()
//       expect((window as any).externalCounter).toBe('functionAttributeInlineNoRefs')
//     })


//     it('should handle attribute event handlers calling a method', () => {
//       view1.render()
//       expect(view1.$('.functionAttributeMethodCall1').length).toBeGreaterThan(0)
//       expect(view1.counter).toBe('')
//       view1.$('.functionAttributeMethodCall1').click()
//       expect(view1.counter).toBe('functionAttributeMethodCall1')
//     })

//     it('should handle attribute event handlers referencing method directly', () => {
//       view1.render()
//       expect(view1.$('.functionAttributeDirectly').length).toBeGreaterThan(0)
//       expect(view1.counter).toBe('')
//       view1.$('.functionAttributeDirectly').click()
//       expect(view1.counter).toBe('functionAttributeDirectly')
//     })

//     xit('should handle function attribute bound to this', () => { // it doesn't work because fn.bind is a native code not printable
//       view1.render()
//       expect(view1.$('.functionAttributeBound').length).toBeGreaterThan(0)
//       expect(view1.counter).toBe('')
//       view1.$('.functionAttributeBound').click()
//       expect(view1.counter).toBe('functionAttributeBound')
//     })

//     it('if ReactLike.supportFunctionAttributes is falsy then fn attributes must be disabled', () => {
//       view1.supportsFunctionAttributes = true
//       ReactLike.supportFunctionAttributes = false
//       view1.render()
//       const h = view1.$el.get(0).outerHTML
//       expect(h).not.toContain('ReactLike._searchForThisView(this)')
//     })

//     it('if view.supportsFunctionAttributes is false then fn attributes must be disabled', () => {
//       view1.supportsFunctionAttributes = false
//       view1.render()
//       expect(view1.$('.functionAttributeInline').length).toBeGreaterThan(0)
//       expect(view1.counter).toBe('')
//       view1.$('.functionAttributeInline').click()
//       expect(view1.counter).toBe('')

//       expect(view1.$('.functionAttributeDirectly').length).toBeGreaterThan(0)
//       expect(view1.counter).toBe('')
//       view1.$('.functionAttributeDirectly').click()
//       expect(view1.counter).toBe('')

//     })

//   })

// })