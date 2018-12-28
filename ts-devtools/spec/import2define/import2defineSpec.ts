import { mkdir, rm, test } from "shelljs";
import { Project, Statement } from "ts-simple-ast";
import { getDefaultExportValue } from "../../src/import2define/getDefaultExportValue";
import { import2define, import2defineProject, Import2DefineResult } from "../../src/import2define/import2define";
import { import2defineOne, printImport2DefineOneResult } from "../../src/import2define/import2defineOne";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";
import { expectCodeEquals } from '../testUtil';


describe('import2define', () => {


  
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
export default const MyExtensionMain = obj
    `)

      project.createSourceFile('MyExtensionView.ts', `
import { Utils, BackboneView } from 'sc-types-frontend'
import template from './my_extension_view.tpl'
export default const MyExtensionView = BackboneView.extend({
  template
})
    `)

      const result = import2defineProject({
        tsconfigFilePath: '',
        project
      })
      expect(result.errors).toEqual([])

      const strs = result.perFileResults.map(pr => printImport2DefineOneResult(pr, false))
      expectCodeEquals(strs[0], `

      import { ExtensionEntryPoint } from 'sc-types-frontend'
      define('MyExtensionMain', ['Utils', 'MyExtensionView'], function(Utils: any, MyExtensionView: any){
        const obj: ExtensionEntryPoint = {
        mountToApp: (container){
          const view = new MyExtensionView()
          view.render()
        }
      }
       const MyExtensionMain = obj
      
        return MyExtensionMain
      })
      
      `)
      expectCodeEquals(strs[1], `
      import { Application } from 'sc-types-frontend'
      define('MyExtensionView', ['Utils', 'Backbone.View', 'my_extension_view.tpl'], function(Utils: any, BackboneView: any, template: any){
        const MyExtensionView = BackboneView.extend({
        template
      })
      
        return MyExtensionView
      })
      `)
    })


    it('import ..', () => {

      const project = new Project()
      project.createSourceFile('foo/bar/boo/a.ts', `import {b} from '../../bb/b' ; export default const a = 1   `)
      project.createSourceFile('foo/bb/b.ts', `import {c} from '../cc/c'  ; export default const b  =2  `)
      project.createSourceFile('foo/cc/c.ts', `export default const c  =3  `)
      const result = import2defineProject({
        tsconfigFilePath: '',
        project
      })
      expect(result.errors).toEqual([])

      const a2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'a'), false)
      expectCodeEquals(a2, `
      import { Application } from 'sc-types-frontend'
define('a', ['b'], function(b: any){
  const a = 1   
  return a
})
`)

      const b2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'b'), false)
      expectCodeEquals(b2, `
      import { Application } from 'sc-types-frontend'
define('b', ['c'], function(c: any){
  const b  =2  
  return b
})
`)
      const c2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'c'), false)
      expectCodeEquals(c2, `
      import { Application } from 'sc-types-frontend'
define('c', [], function(){
  const c  =3  
  return c
})
`)

    })


    it('import a .tsx file', () => {

      const project = new Project()
      project.createSourceFile('foo/bar/boo/a.ts', `import b from '../../bb/b' ; export default const a = 1   `)
      project.createSourceFile('foo/bb/b.tsx', `export default <div></div> `)
      const result = import2defineProject({
        tsconfigFilePath: '',
        project
      })
      debugger
      expect(result.errors).toEqual([])

      const a2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'a'), false)
//       expectCodeEquals(a2, `
//       import { Application } from 'sc-types-frontend'
// define('a', ['b'], function(b: any){
//   const a = 1   
//   return a
// })
// `)
      const b2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'b'), false)
//       expectCodeEquals(b2, `
//       import { Application } from 'sc-types-frontend'
// define('b', ['c'], function(c: any){
//   const b  =2  
//   return b
// })
// `)

const p2 = new Project()
p2.createSourceFile
debugger
    })



  })
  describe('errors', () => {
    xit('no default export', () => { })
    xit('no default export with classes/functions/variables', () => { })

  })

  describe('import2define', () => {
    it('write output project', () => {
      mkdir('-p', 'tmp')
      const outputFolder = getPathRelativeToProjectFolder('tmp/project1_ts_Outtt')
      rm('-rf', `${outputFolder}`)
      const result = import2define({
        tsconfigFilePath: getPathRelativeToProjectFolder(`spec/fixtures/project1/tsconfig.json`),
        outputFolder: outputFolder, 
        debug: true
      })
      expect(result.errors).toEqual([])
      expect(test(`-f`, `${outputFolder}/src/FrontEndSimple1.ListView.ts`)).toBe(true)
      expect(test(`-f`, `${outputFolder}/src/FrontEndSimpleEntry.ts`)).toBe(true)
    })

    it('tsx files', () => {
      mkdir('-p', 'tmp')
      const outputFolder = getPathRelativeToProjectFolder('tmp/tsxTest_ts_Outtt33')
      rm('-rf', `${outputFolder}`)
      const result = import2define({
        tsconfigFilePath: getPathRelativeToProjectFolder(`spec/fixtures/tsxTest/tsconfig.json`),
        outputFolder: outputFolder, 
        debug: true
      })
      result.perFileResults.forEach(f => {
        if (f.imports.length) {
          expect(test('-f', f.imports[0].importSpecifierSourceFile.getFilePath())).toBe(true)
        }
      })
    })


  xit('strongly typed projects', ()=>{
    mkdir('-p', 'tmp/')
    let inputFolder = getPathRelativeToProjectFolder('../sample-projects/jsx-view-tests')
    let outputFolder = getPathRelativeToProjectFolder('tmp/jxs-view-tests_ts_out')
    rm('-rf', outputFolder)
    const export2defineResult = import2define({
      tsconfigFilePath: `${inputFolder}/tsconfig.json`,
      outputFolder
    })
    expect(export2defineResult.errors).toEqual([])
    const p = new Project({tsConfigFilePath: `${outputFolder}/tsconfig.json`})
    const s = p.getPreEmitDiagnostics().map(d=>`${d.getCode()} ${d.getCategory()} ${d.getMessageText()} ${d.getSourceFile().getBaseName()}`).join('\n')
    // console.log(s);
    
  })


  })


})

