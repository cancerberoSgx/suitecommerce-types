import { import2DefineOnePrintResult } from "../src/import2define/import2DefineOnePrintResult";
import { Import2DefineResult, import2defineProject } from "../src";
import Project from "ts-simple-ast";

export function expectCodeEquals(a: string, b: string) {
  // console.log(a, b);
  if(!a||!b)return false
  expect(a.replace(/\s+/gm, ' ').trim()).toEqual(b.replace(/\s+/gm, ' ').trim())
}

export function expectCodeToContain(a: string, b: string) {
  // console.log(a, b);
  if(!a||!b)return false
  expect(a.replace(/\s+/gm, ' ').trim()).toContain(b.replace(/\s+/gm, ' ').trim())
}

export function expectCodeNotToContain(a: string, b: string) {
  // console.log(a, b);
  if(!a||!b)return false
  expect(a.replace(/\s+/gm, ' ').trim()).not.toContain(b.replace(/\s+/gm, ' ').trim())
}

// export interface File {name: string, content: string}
// export function import2defineCompileProject(files: File[]):{outputFiles: File[],result: Import2DefineResult,  project: Project}{
//   const project = new Project()
//   files.forEach(f=>project.createSourceFile(f.name, f.content))
//   const result = import2defineProject({
//     tsconfigFilePath: '',
//     project, 
//     outputFolder: 'tmp2'
//   })
//   const outputFiles: File[] = result.perFileResults.map(r=>{return {name: r.exportName+'.ts', content: import2DefineOnePrintResult(r)}})
//   // expect(result.errors).toEqual([])
  
//   const diags = project.formatDiagnosticsWithColorAndContext(project.getPreEmitDiagnostics())
//   debugger
//   console.log(diags);
  
//   return {outputFiles, result, project}
//   return null
// }

export function printFileOutput(result: Import2DefineResult, filePath:string): string{
  return import2DefineOnePrintResult(result.perFileResults.find(r => r.sourceFile.getFilePath() === filePath)||result.perFileResults.find(r => r.sourceFile.getBaseName() === filePath)||result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === filePath), false)
}