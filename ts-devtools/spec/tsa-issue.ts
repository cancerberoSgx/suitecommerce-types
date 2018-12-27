import {Project} from 'ts-simple-ast'
import { JsxEmit } from 'typescript';

const p = new Project({
  compilerOptions: {
    // jsx: JsxEmit.Preserve
  }
})
const t = p.createSourceFile('t.ts', `import {r} from './r'; import {s} from './s'`)
const r = p.createSourceFile('r.tsx', `export const r = 1`)
const s = p.createSourceFile('s.ts', `export const s = 1`)
const msf = t.getImportDeclarations().forEach(id=>{
  console.log(id.getText(), !!id.getModuleSpecifierSourceFile());
})
