// describes interface method overrides problem - I have to copy&paste ancestor interface's method overrides declarations on each sub-interface in order to user call expressions to be casted correctly. 
// In the following example, Extension2 extends Extension1 so I expect to inherith all its overrides which is not true and I have to copy&paste them manually
// I think this pattern is very common for example when typing event emitter interface's hierarchy and makes the work hard and code ugly and repeated

interface Base {
  on(event: string, handler: (...args: any[])=>any): any
}

interface Extension1 extends Base {
  on(event: 'foo1', handler: (foo: string[]) => void): any
  on(event: 'foo2', handler: (foo: boolean[]) => void): any
}

interface Extension2 extends Extension1 {
  on(event: 'bar1', handler: (dates: Date[]) => Promise<void>): any


  // I need to at least add the following line so compilation don't fail. 
  // Not 100% sure why since I extends Base, but is not a problem, just a line for each method overrides
  // How ever this won0t be enough for correct type casting on user calls - see below
  on(event: string, handler: (...args: any[])=>any): any 


  // If I don't add the following override testExtension2() won't cast handler correctly. 
  // Is not a big deal in this example but imagine a big hierarchy and with many methods and overrides ? 
  // is a nightmare. I need to repeat (incrementally on each extension) all the parent's overrides... 

  // on(event:'foo', handler: (foo: string[])=>void):any 
}


function testExtension2() {
  let e2: Extension2
  e2.on('foo1', dates => {
    // dates is casted to any and it should be Date[]
    // for it to be casted correctly in Extension2 I have to copy&paste Extension1 overrides
  }) 
}