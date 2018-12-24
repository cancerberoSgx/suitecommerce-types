import { Project } from "ts-simple-ast";
import { export2defineSingleFileString, Export2DefineResult, export2defineProject, export2defineSingleFile } from "../../src/import2define/import2define";

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
      const output = export2defineSingleFileString(resultSingle)
      expect(result.errors).toEqual(expectedErrors)
      expectCodeEquals(output, expectedOutput)
    }

    //todo: errors, no import, default import, assign import namespace import
    it('single file', () => {

      test(`
import {a, b} from 'foo' 
export const bar = 1
    `, `
define('bar', ['foo', 'foo'], function(a, b){
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
define('extension', ['Util'], function(Util){
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
import {template} from './my_extension_view.tpl'
export const MyExtensionView = View.extend({
  template
})
    `)

      const result = export2defineProject({
        tsconfigFilePath: '',
        project
      })
      result.perFileResults.forEach(pr => console.log(export2defineSingleFileString(pr)))

      const strs = result.perFileResults.map(pr => export2defineSingleFileString(pr))
      expectCodeEquals(strs[0], `
define('MyExtensionMain', ['Util', 'MyExtensionView'], function(Util, MyExtensionView){
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
define('MyExtensionView', ['./my_extension_view.tpl'], function(template){
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