function f(Something: any): void {
  const a = new Something<string>()
}

function f2(Something: (any|{new<A>()})): void {
  const a = new Something<string>()
}