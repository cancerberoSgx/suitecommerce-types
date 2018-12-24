import { Project } from "ts-simple-ast";
import { import2defineProject, Import2DefineResult, import2define } from "../../src/import2define/import2define";
import { import2defineOne, printImport2DefineOneResult } from "../../src/import2define/import2defineOne";
import {expectCodeEquals} from '../testUtil'
import { resolve } from "path";
import { rm, test } from "shelljs";

describe('import2define', () => {

  describe('import2defineOne', () => {

    function test(source: string, expectedOutput: string, expectedErrors: string[]) {
      const project = new Project()
      const sourceFile = project.createSourceFile('test3.ts', source)
      const result: Import2DefineResult = {
        errors: [], perFileResults: []
      }
      const resultSingle = import2defineOne({
        tsconfigFilePath: 'doesntMatter.json',

      }, sourceFile, result)
      const output = printImport2DefineOneResult(resultSingle)
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

    it('other export decls in statements before should be preserved if interface decl', () => { //should work
      test(`
import {Util, View} from 'sc-types-frontend'
import template from './my_extension_view.tpl'
export interface IMyExtensionView {
  play(): void
}
export const MyExtensionView:IMyExtensionView = View.extend({
  template, 
  play(){}
})
    `, `

import {Util, View} from 'sc-types-frontend'
define('MyExtensionView', ['my_extension_view.tpl'], function(template: any){
  return View.extend({
  template, 
  play(){}
})
})
export interface IMyExtensionView {
  play(): void
}
    
`,
        [])
    })



  })

  describe('import2defineProject', () => {

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

      const result = import2defineProject({
        tsconfigFilePath: '',
        project
      })
      // result.perFileResults.forEach(pr => console.log(printimport2defineFileResult(pr)))
      expect(result.errors).toEqual([])

      const strs = result.perFileResults.map(pr => printImport2DefineOneResult(pr))
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


    describe('import2define', () => {

      it('write output project', () => {
        rm('-rf', 'dist/project1')
        const result = import2define({
          tsconfigFilePath: resolve('spec/fixtures/project1/tsconfig.json'),
          outputFolder: resolve('dist/project1')
        })
        expect(result.errors).toEqual([])
        expect(test('-f', 'dist/project1/src/FrontEndSimple1.ListView.ts'))
        expect(test('-f', 'dist/project1/src/FrontEndSimpleEntry.ts'))
      })

    })


  })

})
