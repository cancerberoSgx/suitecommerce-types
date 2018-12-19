import { mkdir, rm, test } from "shelljs";
import { Project } from "ts-simple-ast";
import { import2define, import2defineProject, ignoreFile } from "../../src/import2define/import2define";
import { import2DefineOnePrintResult } from "../../src/import2define/import2DefineOnePrintResult";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";
import { expectCodeEquals, printFileOutput } from '../testUtil';
import { DUMMY_MODULE_FLAG } from "../../src/import2define/getDefaultExportValue";

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

      const strs = result.perFileResults.map(pr => import2DefineOnePrintResult(pr, false))
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

      const a2 = import2DefineOnePrintResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'a'), false)
      expectCodeEquals(a2, `
      import { Application } from 'sc-types-frontend'
define('a', ['b'], function(b: any){
  const a = 1   
  return a
})
`)

      const b2 = import2DefineOnePrintResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'b'), false)
      expectCodeEquals(b2, `
      import { Application } from 'sc-types-frontend'
define('b', ['c'], function(c: any){
  const b  =2  
  return b
})
`)
      const c2 = import2DefineOnePrintResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'c'), false)
      expectCodeEquals(c2, `
      import { Application } from 'sc-types-frontend'
define('c', [], function(){
  const c  =3  
  return c
})
`)

    })


    // xit('testing testutil import2defineCompileProject', ()=>{
    //   import2defineCompileProject([
    //     {name: 'tmp/user.ts', content: `import { I2 } from './types'  ; export default class implements I2 {} `}, 
    //     {name: 'tmp/types.ts', content: `export interface I1 {}; export type T1 = false; export interface I2 extends I1 {}`}
    //   ])
    // })

    it('dependency prefix', () => {
      const project = new Project()
      project.createSourceFile('model/apple.ts', `export default class {} `)
      project.createSourceFile('model/orange.ts', `export default class {} `)
      // project.createSourceFile('model/index.ts', `export * from './apple; export * from './orange `)
      project.createSourceFile('model/types.ts', `export interface I1 {}; export type T1 = false; export interface I2 extends I1 {}`)
      project.createSourceFile('user.ts', `
      import Apple from './model/apple'; 
      import Orange from './model/orange';
      import {I2} from './model/types'; 
      export default const apple = new Apple() as I2
      `)
      const result = import2defineProject({
        tsconfigFilePath: '',
        project,
        dependencyPrefix: 'Foo',
        debug: true
      })
      expect(result.errors).toEqual([])

      const apple = printFileOutput(result, 'apple.ts')
      const orange = printFileOutput(result, 'orange.ts')
      const user = printFileOutput(result, 'user.ts')
      expectCodeEquals(apple, `
      import { Application } from 'sc-types-frontend'
      define('Fooapple', [], function(){
        return  class {}
      })
         `)
      expectCodeEquals(orange, `
      import { Application } from 'sc-types-frontend'
      define('Fooorange', [], function(){
        return  class {}
      })
            `)
      expectCodeEquals(user, `
      import { I2 } from './model/types'
      define('Foouser', ['Fooapple', 'Fooorange'], function(Apple: any, Orange: any){
        const apple = new Apple() as I2
        return apple
      })
                  `)
    })

    xit('import an index file a la node', () => {
      const project = new Project()
      project.createSourceFile('model/apple.ts', `export class Apple {} `)
      project.createSourceFile('model/orange.ts', `export class Orange {} `)
      project.createSourceFile('model/index.ts', `export * from './apple; export * from './orange `)
      project.createSourceFile('user.ts', `import {Apple, Orange} from './model`)
      const result = import2defineProject({
        tsconfigFilePath: '',
        project,
        // debug: true
      })
      expect(result.errors).toEqual([])
    })

    it('export several types and no default value', () => {
      const project = new Project()
      project.createSourceFile('tmp/user.ts', `import { I2 } from './types'  ; export default class implements I2 {} `)
      project.createSourceFile('tmp/types.ts', `export interface I1 {}; export type T1 = false; export interface I2 extends I1 {}`)
      const result = import2defineProject({
        tsconfigFilePath: '',
        project
      })
      expect(result.errors).toEqual([])

      const types = printFileOutput(result, 'types.ts')
      const user = printFileOutput(result, 'user')
      // debugger
      expectCodeEquals(types, `
      import { Application } from 'sc-types-frontend'
      define('${DUMMY_MODULE_FLAG}', [], function(){
        ;
        return undefined
      })
      export interface I1 {}
      export type T1 = false;
      export interface I2 extends I1 {}
         `)

      expectCodeEquals(user, `
      import { I2 } from './types'
      define('user', [], function(){  
        return  class implements I2 {}
      })      
       `)
    })



    it('ignoreFile', () => {
      const f1 = new Project().createSourceFile('t.ts', 'const a ')
      const f2 = new Project().createSourceFile('t.ts', `
// @sc-tsc-ignore-file
import * as ts from 'typescript'
`)
      expect(ignoreFile(f1)).toBe(false)
      expect(ignoreFile(f2)).toBe(true)
    })

    

    it('import a .tsx file', () => {
      const project = new Project()
      project.createSourceFile('foo/bar/boo/a.ts', `import b from '../../bb/b' ; export default const a = b`)
      project.createSourceFile('foo/bb/b.tsx', `
import ReactLike  from './ReactLike';
export default (context:CoolFeature56MainViewContext): JSX.Element =>
  <div className="jojojo">
    <p>name: {context.name}</p>
  </div>
;
export interface CoolFeature56MainViewContext {
  name: string;
}
`)

      const result = import2defineProject({
        tsconfigFilePath: '',
        project
      })
      
      // debugger
      expect(result.errors).toEqual([])

      const a2 = import2DefineOnePrintResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'a'))
      expectCodeEquals(a2, `
type _un2_iQu3_<I=any,J=any,K=any,L=any,M=any>=any
type b<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
type a<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_

import { Application } from 'sc-types-frontend'
define('a', ['b'], function(b: any){
  const a = b
  return a
})    
      `)
      const b2 = import2DefineOnePrintResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'b'))
      expectCodeEquals(b2, `
type _un2_iQu3_<I=any,J=any,K=any,L=any,M=any>=any
type ReactLike<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
type b<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_

import { Application } from 'sc-types-frontend'
define('b', ['./ReactLike'], function(ReactLike: any){
  
  return  (context:CoolFeature56MainViewContext): JSX.Element =>
  <div className="jojojo">
    <p>name: {context.name}</p>
  </div>
;
})
export interface CoolFeature56MainViewContext {
  name: string;
}
            
      `)

      // console.log(a2, b2);

      // const p2 = new Project()
      // p2.createSourceFile
      // debugger
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
        // debug: true
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
        // debug: true
      })
      result.perFileResults.forEach(f => {
        if (f.imports.length) {
          expect(test('-f', f.imports[0].importSpecifierSourceFile.getFilePath())).toBe(true)
        }
      })
    })


    it('strongly typed projects', () => {
      mkdir('-p', 'tmp/')
      let inputFolder = getPathRelativeToProjectFolder('../sample-projects/jsx-view-tests')
      let outputFolder = getPathRelativeToProjectFolder('tmp/jxs-view-tests_ts_out')
      rm('-rf', outputFolder)
      const export2defineResult = import2define({
        tsconfigFilePath: `${inputFolder}/tsconfig.json`,
        outputFolder
      })
      expect(export2defineResult.errors).toEqual([])
      const p = new Project({ tsConfigFilePath: `${outputFolder}/tsconfig.json` })
      const s = p.getPreEmitDiagnostics().map(d => `${d.getCode()} ${d.getCategory()} ${d.getMessageText()} ${d.getSourceFile().getBaseName()}`).join('\n')
      // console.log(s);
      //TODO: check compile errors in output and output code
    })


  })


})

