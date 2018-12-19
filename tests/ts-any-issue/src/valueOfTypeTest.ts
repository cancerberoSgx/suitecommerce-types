

/** returns the type of the value with key K in the Mapped type T. 
 * 
 * Example1: `type _string = ValueOf<A, 'a'>` 
 * 
 * Example 2 :
 * 
```
// the following is model-like class which attributes object are described with a type param and which 
// getAttributes() and setAttributes methods are automatically type checked, not only for references 
// describing the attributes names but also for references describing its attribute values
type Obj = {[k:string]: any}
class Model<Attributes extends Obj = {}>{
  attributes: Attributes = {} as Attributes
  getAttribute<T extends string = typeof name>(name: T) : ValueOf<Attributes, T> {
    return this.attributes[name]
  }
  setAttribute<T extends string = typeof name>(name: T, value: ValueOf<Attributes, T>): void {
    this.attributes[name]=value
  }
}
interface A1 {
  name: string, 
  age: number 
}
const m = new Model<A1>()
var string1 = m.getAttribute('name')
var number1 = m.getAttribute('age')
m.setAttribute('name', 'seba') // ok 
m.setAttribute('name', 123) // error 
m.setAttribute('age', 123) // ok
m.setAttribute('age', 'seba') // error
```
 */
type ValueOf<T extends { [k: string]: any }, K extends string> = T[K];

// the following is model-like class which attributes object are described with a type param and which getAttributes() and setAttributes methods are automatically type checked, not only for references describing the attributes names but also for references describing its attribute values
type Obj = {[k:string]: any}
class Model<Attributes extends Obj = {}>{
  attributes: Attributes = {} as Attributes
  getAttribute<T extends string = typeof name>(name: T) : ValueOf<Attributes, T> {
    return this.attributes[name]
  }
  setAttribute<T extends string = typeof name>(name: T, value: ValueOf<Attributes, T>): void {
    this.attributes[name]=value
  }
}


interface A1 {
  name: string, 
  age: number 
}
const m = new Model<A1>()
var string1 = m.getAttribute('name')
var number1 = m.getAttribute('age')

m.setAttribute('name', 'seba') // ok 
m.setAttribute('name', 123) // error 
m.setAttribute('age', 123) // ok
m.setAttribute('age', 'seba') // error

