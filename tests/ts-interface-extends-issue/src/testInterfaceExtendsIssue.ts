interface Base {
  on(event:string, handler: any):any
}

interface Extension1 extends Base {
  on(event:'foo', handler: (foo: string[])=>void):any
  // on(event:string, handler: any):any // why do I need to add this ?
}


interface Extension2 extends Extension1 {
  on(event:'bar', handler: (b: Date[])=>Promise<void>):any
  // on(event:string, handler: any):any // why do I need to add this ?

}


interface Extension3 extends Extension2 {
  on(event:'hhh', handler: (h: number[])=>boolean):any
  // on(event:string, handler: any):any // why do I need to add this ?
}


interface Extension31 extends Extension2, Base {
  on(event:'hhh', handler: (h: number[])=>boolean):any
  // on(event:string, handler: any):any // why do I need to add this ?
}
