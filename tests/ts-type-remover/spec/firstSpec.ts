import { Project, SourceFile, Identifier, SyntaxKind, TypeGuards, TextChange, VariableDeclaration } from "ts-simple-ast";
import { removeTypes } from "../src";

// type Foo <Foo1 extends Foo = Foo, Foo2, Foo2> = 


describe('f', () => {
  it('as', () => {
    const p = new Project()
    const f = p.createSourceFile('f1.ts', `
import {F} from 'as'
import H from './h'

interface I{}
let a: I 
let b: F
let c: Array<string>|Date
let g : K<F, H>
`)
    const allTypeNames = getAllTypeReferencesIds(f).sort((a, b)=>{
      return (a.getFullStart()>b.getFullStart()) ? -1 : 1
    })

    console.log(allTypeNames.map(n=>n.getText()));
    
    // const v: VariableDeclaration = null
    // v.getTypeNode().replaceWithText()

    allTypeNames.forEach(i=>{
      const tr = i.getParent()
      const parent = tr.getParent() as any
      if(!parent){
        return
      }
      if(parent.getTypeNode){
        const tn = parent.getTypeNode()
        if(tn && tn.replaceWithText){
          tn.replaceWithText('')
        }
      }
    })

    console.log(f.getText());
    
    // console.log(    allTypeNames.map(i=>({name: i.getText(), hasDeclaration: hasDeclaration(i), parent: `${i.getParent().getParent().getKindName()} ${(i.getParent().getParent() as any).getTypeNode}`})))
  //  const r = replace(p, f, 'any', [])
  //  console.log(r);
   
  })
})
// export function replace(p: Project, f: SourceFile, replaceWith: string, ignoreModules:string[]=[] ): string {
//   let f2: SourceFile=f
//     let s: string
    
//     let toRename, counter=0
//     while((toRename=getIdentifiersToRename(f2, ignoreModules, [replaceWith])).length) {
//       const id = toRename[0]
//       // f.text
//       console.log(id.getText(), f2.getText());
//       // id.rename(replaceWith)
//       id.replaceWithText(replaceWith)
//       s=f2.getText()
//       p.removeSourceFile(f)
//       f2 = p.createSourceFile('tmp_'+(counter++)+'.ts', s)
//     }
//     const re = f2.getText()
//     return re
// }
export function hasDeclaration(i: Identifier): boolean {
  const s = i.getSymbol()
  if(!s){return false}
  return !!s.getDeclarations().find(d=>d.getSourceFile()===i.getSourceFile())
}
export function getAllTypeReferencesIds(f: SourceFile): Identifier[] {
  const allIds = f.getDescendantsOfKind(SyntaxKind.TypeReference)
  return flat(allIds.map(tr => tr.getChildrenOfKind(SyntaxKind.Identifier)))
}
/** filter getAllTypeReferencesIds only those which are declare in this file  */
export function getIdentifiersToRename(f: SourceFile, ignoreModules:string[]=[], ignoreNames:string[]=[]): Identifier[] {
  const ids = getAllTypeReferencesIds(f)
  const filtered = ids.filter(i => {
    const s = i.getSymbol()
    // return !!s
    if (!s) { return true }
    // const thisFileDecls = s.getDeclarations().filter(d => d.getSourceFile() === f)
    // const fromImports = thisFileDecls.filter(d => TypeGuards.isImportClause(d) || TypeGuards.isImportSpecifier(d))
    // const fromRelativeImport = fromImports.map(i => i && i.getFirstAncestorByKind(SyntaxKind.ImportDeclaration)).filter(d => (d.isModuleSpecifierRelative() || ignoreModule.indexOf(d.getModuleSpecifierValue())!==-1))
    // return fromRelativeImport.length
  })
  return filtered
}

export function flat<T>(arr: T[][]): T[] {
  return arr.reduce((a, b) => a.concat(b))
}