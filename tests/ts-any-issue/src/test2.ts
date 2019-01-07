// type ANY= TT2
type FN1 = (<T>(...args: any[])=>any)
type NEW1 = (new <T>(...args: any[])=>any) 
type NATIVES = (number & boolean)
type ANY<T> =  (FN1&NATIVES) & (NEW1&NATIVES) | NATIVES
type ANY2 = FN1&NEW1&boolean
type TT = (<T2>()=>any)&(new <T2>()=>any)

// let a: ANY2
// a<number>()
// a=true

new a<number>()

import {Project, SyntaxKind, TypeGuards} from 'ts-simple-ast'
const p = new Project()
const f = p.createSourceFile('t.ts', `
//type TT = (<T2>()=>any)&(new <T2>()=>any)
let a
a<number>()
new a<number>()
`)
// f.getDescendantsOfKind(SyntaxKind.CallExpression).forEach(n=>
  

  f.getDescendants()
  // .filter(n=>TypeGuards.isTypeParameteredNode(n)||TypeGuards.isTypeArgumentedNode(n))
  .filter(n=>TypeGuards.isIdentifier(n))
  .forEach(i=>{
    // console.log(i.getText());
    
    const ct = p.getTypeChecker().getTypeAtLocation(i)
    const cc = p.getTypeChecker().getApparentType(i.getType())
    const ccp = p.getTypeChecker().getApparentType(i.getParent().getType())
    // const sy = 
    const sy = p.getTypeChecker().getTypeOfSymbolAtLocation(i.getSymbol(), i)
    // const ss = p.getTypeChecker().getSignatureFromNode(i.sy)
    console.log(i.getText(), i.getParent().getText(), ct && ct.getText(), cc && cc.getText(), ccp && ccp.getText(), sy && sy.getText())
  })
