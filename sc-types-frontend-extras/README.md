# SuiteCommerce Types FrontEnd extra functionality

adds extra functionality to sc-types-frontend-core

Right now it adds supports for JSX React HTML-like syntax [JSX / TSX](https://www.typescriptlang.org/docs/handbook/jsx.html) 

# Examples

 * Write template with JSX, and use Backbone for all the rest:  (sample-projects/jsx-view-tests/src/JavaScript/CoolFeature56MainView2.tsx)[example]
 * See how to write small functionaSee [sample](./sca-module-unit-test) for an example of a TypeScript project containing .tsx files implementing views using this syntax for markup.

# Why? 

 * Type checking in templates

# What ? 

# Status of TSX/JSX support

 * Supports all HTML DOM intrinsic elements (div, p, etc) and attributes so you have 100% typechecking (like in react)
 * Doesn't depend on React or any other library - it has a copy of react typings for intrinsic elements.
 * provides `JSXView` that extends `Backbone.View` with `jsxTemplate` attribute for writing the template in the same .tsx file as an attribute of the class:
 * is lightweight since no library (like react, preact, etc) is included. Only JSX syntax support to render HTML.
 * Doesn't support any react-like features like state-aware components, event bindings, virtual-dom, etc. You will still have to work with Backbone View, Model, Events, bindings, etc for this. Just write your templates in TSX/JSX instead of handlebars and keep using Backbone for the rest
  * Has partial support for function attributes to declare event handlers as JSX attributes (experimental!) - safer to use Backbone.View event
  * JSXView extends Backbone.View to support a jsxTemplate attribute instead of template one. It will render jsxTemplate using the Backbone.View.render() life cycle so is compatible with Backbone.View.render plugins like any other view. See (sample-projects/jsx-view-tests/src/JavaScript/CoolFeature56MainView2.tsx)[example]



# JSX / TSX 

## Setup 

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

interface Context1 extends TemplateContext {
  name: string
}

class ViewJSXAndBackboneEvents extends JSXView<BackboneModel, Context1> {

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


## Reusable custom JSX tags (Stateless Functional Component)

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

## Use <Bind> for installing Backbone.View.bindings from markup

```ts
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

# IDEAS

 * using jss and css-classes-to-typescript, let users declare which CS sass classes a component extends in the TSX code, examples: `<div extends="sc-primary"><span extends={['sc-important', 'sc-big']}>`. thanks to css-classes-to-typescript it will be type checked, and also using something like the following is possible to typed and programmatically do it: 
 
 ```
const generateClassName: GenerateClassName<AllStylesType> = (rule: Rule, sheet?: StyleSheet<AllStylesType>)=>{  
  return (rule as any).key
}
const sheet = jss.createStyleSheet(allStyles, {generateClassName, })
sheet.addRule('myButton', {'@extends .dsds': '--sc-sass-extends'} as any)

```