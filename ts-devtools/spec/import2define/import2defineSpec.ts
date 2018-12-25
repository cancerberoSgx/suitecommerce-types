import { Project } from "ts-simple-ast";
import { import2defineProject, Import2DefineResult, import2define } from "../../src/import2define/import2define";
import { import2defineOne, printImport2DefineOneResult } from "../../src/import2define/import2defineOne";
import {expectCodeEquals} from '../testUtil'
import { resolve } from "path";
import { rm, test, mkdir } from "shelljs";

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
import { a, b } from 'foo' 
export const bar = 1
    `, `
define('bar', ['foo', 'foo'], function(a: any, b: any){
  return 1
})`,
        [])

    })

    it('single file export declared separately', () => { //should work
      test(`
import { ExtensionEntryPoint, Utils } from 'sc-types-frontend'
const obj: ExtensionEntryPoint = {
  mountToApp: (container){
    alert(Utils.translate('hello'))
  }
}
export const extension = obj
    `, `
import { ExtensionEntryPoint } from 'sc-types-frontend'
define('extension', ['Utils'], function(Utils: any){
  const obj: ExtensionEntryPoint = {
  mountToApp: (container){
    alert(Utils.translate('hello'))
  }
}
  return obj
})
`,
        [])
    })

    it('other export decls in statements before should be preserved if interface decl', () => { //should work
      test(`
import { Utils, BackboneView, View } from 'sc-types-frontend'
import template from './my_extension_view.tpl'
export interface IMyExtensionView extends View {
  play(): void
}
export const MyExtensionView: IMyExtensionView = BackboneView.extend({
  template, 
  play(){
    alert(Utils.translate('hello'))
  }
})
    `, `

import { View } from 'sc-types-frontend'
define('MyExtensionView', ['Utils', 'Backbone.View', 'my_extension_view.tpl'], function(Utils: any, BackboneView: any, template: any){
  return BackboneView.extend({
  template, 
  play(){
    alert(Utils.translate('hello'))
  }
})
})
export interface IMyExtensionView extends View {
  play(): void
}
    
`,
        [])
    })

xit('classed can be exported', ()=>{
  const code1 =`
import { Model, BackboneModel } from 'sc-types-frontend';
export class MineModel extends BackboneModel {
  async magick(t: 1 | 2 | 3 | 4): Promise<number> {
    await sleep(t)
    return t + 1
  }
}
  `
  })



  // fails because it tranlate to define('x', [], function(){ const y = x + 2 return 1 }) / basically we 
  // cannot use the exported variable after the export statament. SOlution is to create a new variable 
  // and replace the return statemtn with it and then at the end return that.s
  xit('fails using exported variable below', ()=>{
    const code1 =`
export const x = 1
const y = x + 2
    `
    test(code1, '', [])
  
    })
})


  describe('import2defineProject', () => {

    it('simple', () => {

      const project = new Project()
      project.createSourceFile('MyExtensionMain.ts', `
import { Utils, ExtensionEntryPoint } from 'sc-types-frontend'
import { MyExtensionView } from './MyExtensionView'
const obj: ExtensionEntryPoint = {
  mountToApp: (container){
    const view = new MyExtensionView()
    view.render()
  }
}
export const MyExtensionMain = obj
    `)

      project.createSourceFile('MyExtensionView.ts', `
import { Utils, BackboneView } from 'sc-types-frontend'
import template from './my_extension_view.tpl'
export const MyExtensionView = BackboneView.extend({
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
import { ExtensionEntryPoint } from 'sc-types-frontend'
define('MyExtensionMain', ['Utils', 'MyExtensionView'], function(Utils: any, MyExtensionView: any){
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
define('MyExtensionView', ['Utils', 'Backbone.View', 'my_extension_view.tpl'], function(Utils: any, BackboneView: any, template: any){
  return BackboneView.extend({
    template  
  })
})
      `)
    })
  })



  describe('import2define', () => {
    it('write output project', () => {
      mkdir('-p', 'tmp')
      const outputFolder = 'tmp/project1Outtt'
      rm('-rf', `${outputFolder}`)
      const result = import2define({
        tsconfigFilePath: resolve(`spec/fixtures/project1/tsconfig.json`),
        outputFolder: outputFolder
      })
      expect(result.errors).toEqual([])
      expect(test(`-f`, `${outputFolder}/src/FrontEndSimple1.ListView.ts`)).toBe(true)
      expect(test(`-f`, `${outputFolder}/src/FrontEndSimpleEntry.ts`)).toBe(true)
    })
  })

})
