# SuiteCommerce Types FrontEnd extra functionality

adds extra functionality to sc-types-frontend-core

Right now it adds supports for JSX React HTML-like syntax (TSX) https://www.typescriptlang.org/docs/handbook/jsx.html

See [sample](./sca-module-unit-test) for an example of a TypeScript project containing .tsx files implementing views using this syntax for markup.

Why? 

 * Type checking in templates

What ? 

# JSXView

## setup 

in tsconfig.json: 

```
    "noStrictGenericChecks": true,
    "strictBindCallApply": false,
    "strictNullChecks": false,
    "strictFunctionTypes": false,
    "noEmitHelpers": true,
    "importHelpers": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "jsx": "react",
    "jsxFactory": "ReactLike.createElement",

```


in package.json

```
    "dependencies": {
        "sc-types-frontend": "file:../../sc-types-frontend",
        "sc-types-frontend-extras": "file:../../sc-types-frontend-extras"
    },
    "devDependencies": {
        "sc-tsc": "file:../../ts-devtools",
        "@types/react": "^16.7.18",
        "tslib": "^1.9.3",
        "typescript": "^3.2.2"
    }
```


## Build

Use sc-tsc like any other project, see [build.sh script](./build.sh)


## Simple JSXView example:

Example of a View using a TSX template:

```ts
import { JSXView, ReactLike } from 'sc-types-frontend-extras';

class Model1 extends BackboneModel {
}

interface Context1 extends TemplateContext {
  name: string
}

class ViewJSXAndBackboneEvents extends JSXView<Model1, Context1> {

  jsxTemplate = context => <div>
    <div className="view1">Name: {context.name}</div>
    <button className="clickme1">clickme1</button>
    <button className="clickme2">clickme2</button>
  </div>

  events() {
    return {
      'click .clickme1': this.clickme1.bind(this)
    }
  }

  clickme1(e: MouseEvent) {
    e.preventDefault()
  }

  getContext(): Context1{
    return {name: 'seba'}
  }
}
  ```


## Example of creating reusable custom JSX tags

Create reusable custom JSX tags so view's template are simpler and strongly type checked:

```ts
import { JSXView, ReactLike } from 'sc-types-frontend-extras';
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
  Addresses: {a.addresses.map(ad =>
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


```


## Partial support for function attributes (event handlers)

Not recommended yet, but optional support for function attributes for event handlers:

```ts
class ViewWithEventAttributesReferencingThisDontWork extends JSXView<Model1, Context1> {

  // IMPORTANT : needs to be true in order to support function attributes
  supportsFunctionAttributes = true

  jsxTemplate = context => <div>
    <button className="b" onClick={e => {
      e.preventDefault()
      console.log('clicked', e.button, e.clientX, this.cid);
    }}>click handler inline as JSX attribute</button>
    <input onInput={e => this.changed(e)} placeholder="input handler calling a view method"></input>
  </div>

  clicked1(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('clicked', e.button, e.clientX, this.cid);
  }

  changed(e: FormEvent<HTMLInputElement>) {
    console.log('changed', e.currentTarget.value, this.cid);
  }
}
```



# TODO

* define custom tags with classes for state: JSX.ElementClass  - as https://www.typescriptlang.org/docs/handbook/jsx.html