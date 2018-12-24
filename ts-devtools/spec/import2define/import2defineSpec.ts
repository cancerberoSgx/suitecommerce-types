import { Project } from "ts-simple-ast";
import { export2defineProject, Export2DefineResult, export2defineSingleFile, Export2DefineSingleFileResult, printExport2DefineFileResult } from "../../src/import2define/import2define";

describe('export2define', () => {


  describe('export2defineSingleFile', () => {

    function test(source: string, expectedOutput: string, expectedErrors: string[]) {
      const project = new Project()
      const sourceFile = project.createSourceFile('test3.ts', source)
      const result: Export2DefineResult = {
        errors: [], perFileResults: []
      }
      const resultSingle = export2defineSingleFile({
        tsconfigFilePath: 'doesntMatter.json',

      }, sourceFile, result)
      const output = printExport2DefineFileResult(resultSingle)
      expect(result.errors).toEqual(expectedErrors)
      expectCodeEquals(output, expectedOutput)
    }

    //todo: errors, no import, default import, assign import namespace import
    it('single file', () => {

      test(`
import {a, b} from 'foo' 
export const bar = 1
    `, `
define('bar', ['foo', 'foo'], function(a: any, b: any){
  return 1
})`,
        [])

    })

    it('single file export declared separately', () => { //should work
      test(`
import {Util} from 'suitecommerce' 
import {ExtensionEntryPoint} from 'sc-types-frontend'
const obj: ExtensionEntryPoint = {
  mountToApp: (container){}
}
export const extension = obj
    `, `
import {ExtensionEntryPoint} from 'sc-types-frontend'
define('extension', ['Util'], function(Util: any){
  const obj: ExtensionEntryPoint = {
  mountToApp: (container){}
}
  return obj
})
`,
        [])
    })
  })

  describe('export2defineProject', () => {

    it('simple', () => {

      const project = new Project()
      project.createSourceFile('MyExtensionMain.ts', `
import {Util} from 'suitecommerce' 
import {ExtensionEntryPoint} from 'sc-types-frontend'
import {MyExtensionView} from './MyExtensionView'
const obj: ExtensionEntryPoint = {
  mountToApp: (container){
    const view = new MyExtensionView()
    view.render()
  }
}
export const MyExtensionMain = obj
    `)

      project.createSourceFile('MyExtensionView.ts', `
import {Util, View} from 'sc-types-frontend'
import template from './my_extension_view.tpl'
export const MyExtensionView = View.extend({
  template
})
    `)

      const result = export2defineProject({
        tsconfigFilePath: '',
        project
      })
      result.perFileResults.forEach(pr => console.log(printExport2DefineFileResult(pr)))
      expect(result.errors).toEqual([])

      const strs = result.perFileResults.map(pr => printExport2DefineFileResult(pr))
      expectCodeEquals(strs[0], `
import {ExtensionEntryPoint} from 'sc-types-frontend'
define('MyExtensionMain', ['Util', 'MyExtensionView'], function(Util: any, MyExtensionView: any){
  const obj: ExtensionEntryPoint = {
    mountToApp: (container){
      const view = new MyExtensionView()
      view.render()
    }
  }
  return obj
})
      `)
      expectCodeEquals(strs[1], `
import {Util, View} from 'sc-types-frontend'
define('MyExtensionView', ['my_extension_view.tpl'], function(template: any){
  return View.extend({
    template
  })
})
      `)
    })

  })
})


function expectCodeEquals(a: string, b: string) {
  expect(a.replace(/\s+/gm, ' ').trim()).toEqual(b.replace(/\s+/gm, ' ').trim())
}

// function printExport2DefineFileResult(r: Export2DefineSingleFileResult): string {
//   return `
// ${r.importsToIgnore.join('\n')}
// define('${r.exportName}', [${r.imports.map(imp => `'${imp.moduleSpecifier}'`).join(', ')}], function(${r.imports.map(i => `${i.name}`).join(', ')}){
//   ${r.body}
//   return ${r.exportValue}
// })
//   `
// }
