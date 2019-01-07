// Index Signatures function values: polymorphism not working as expected. 

interface Mammal extends Animal {
  bar: number
}
interface Animal {
  a: number
}
interface Dog extends Mammal {
  foo: number
}

interface Keyed1 {
  [selector: string]: ((a: Animal) => boolean)
}
const e: Keyed1 = {
  'foo': (dog: Dog): boolean => {
    // ERROR: Type '(dog: Dog) => boolean' is not assignable to type '(a: Animal) => boolean'.
    // Types of parameters 'dog' and 'a' are incompatible.
    // Type 'Animal' is missing the following properties from type 'Dog': foo, barts(2322)
    return true
  },

  'foo2': (a: Animal): boolean => {
    // so I have to manually cast to Dog in function body :(
    const dog = a as Dog
    return dog.bar === 9
  },
  foo3(dog: Dog): boolean {
    // ERROR: Type '(dog: Dog) => boolean' is not assignable to type '(a: Animal) => boolean'.
    // Types of parameters 'dog' and 'a' are incompatible.
    // Type 'Animal' is missing the following properties from type 'Dog': foo, barts(2322)
    return true
  },
}


// examples where this is working correctly - seems in every other case but keyed objects

interface I {
  start(a: Animal): boolean
}
const i: I = {
  // no error implementing an interface using sub class in signature (a Dog is an Animal)
  start(a: Dog): boolean { return false }
}
class C implements I {
  // no error, same as before implementing a class
  start(a: Dog): boolean { return false }
}

class D {
  foo(a: Animal): boolean { return a.a === 0 }
}
class F extends D {
  // no error, same as before extending a class
  foo(a: Dog): boolean { return !super.foo(a) }
}

