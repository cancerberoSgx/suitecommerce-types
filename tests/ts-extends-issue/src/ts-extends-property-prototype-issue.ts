class Foo {
  prop1 = 1
  m1(){}
}

const foo = new Foo()
console.log(!!Foo.prototype.m1, !!Foo.prototype.prop1);
