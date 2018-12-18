import { MouseEvent } from 'react';
import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike } from 'sc-types-frontend-extras';

const Name = (props: { name: string }) =>
  <span className="name" style={{ border: '2px sold pink' }}>{props.name}</span>

const Age = (props: { age: number }) =>
  <span className="age">{props.age}</span>

const Person = (props: Person) =>
  <div className="person">
    <Name name={props.name}></Name>
    <Age age={props.age}></Age>
    {props.contacts.map(a =>
      <Contact addresses={a.addresses} phone={a.phone}></Contact>)}
  </div>

const Address = (props: Address) => <span>
  {props.name} number: {props.number}
</span>

const Contact = (a: Contact) => <div>
  Addresses:
{a.addresses.map(ad =>
    <div>Street 1: <Address name={ad.name} number={ad.number}></Address></div>)}
</div>

interface Contact {
  addresses: Address[]
  phone: string
}

interface Address {
  name: string,
  number: number
}
interface Person {
  name: string,
  age: number
  contacts: Contact[]
}


class ViewJSXAndBackboneEvents extends JSXView<BackboneModel, Context1> {

  jsxTemplate = (context: Context1) => <div>
    {context.persons.map(p =>
      <Person name={p.name} age={p.age} contacts={p.contacts}></Person>
    )}
    <br />
    <button className="clickme1">clickme1</button>
  </div>

  context: Context1 = { persons: [] }

  events() {
    return {
      'click .clickme1': this.clickme1.bind(this)
    }
  }

  getContext() {
    return this.context
  }

  clickme1(e: MouseEvent) {
    e.preventDefault()
    console.log('clickme1')
  }
}

interface Context1 extends TemplateContext {
  persons: Person[]
}


export default describe('Reusing jsx', () => {


  let view1: ViewJSXAndBackboneEvents

  beforeEach(() => {
    view1 = new ViewJSXAndBackboneEvents()
    view1.$el = jQuery('<div></div>').appendTo('body');
  })

  afterEach(() => {
    // view1.destroy()
  })

  it('should render a list of composed custom tags', () => {
    view1.context = {
      persons: [
        { name: 'seba', age: 18, contacts: [{ addresses: [{ name: 'foo', number: 1221 }], phone: '123123123' }] },
        { name: 'laura', age: 15, contacts: [{ addresses: [{ name: 'bar', number: 8787 }], phone: '987987987' }] }
      ]
    }

    expect(document.querySelectorAll('.person').length).toBe(0)
    expect(document.querySelectorAll('.name').length).toBe(0)
    expect(document.querySelectorAll('.age').length).toBe(0)
    view1.render()
    expect(document.querySelectorAll('.person').length).toBe(2)
    expect(document.querySelectorAll('.name').length).toBe(2)
    expect(document.querySelectorAll('.age').length).toBe(2)

    const seba = (Array.prototype.slice.call(document.querySelectorAll('.person')) as HTMLElement[]).find(e => e.innerText.includes('seba'))
    expect(seba.innerText).toContain('18')
    // debugger
  })

})
