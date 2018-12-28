import { mkdir, rm, test } from "shelljs";
import { Project, Statement } from "ts-simple-ast";
import { getDefaultExportValue } from "../../src/import2define/getDefaultExportValue";
import { import2define, import2defineProject, Import2DefineResult } from "../../src/import2define/import2define";
import { import2defineOne, printImport2DefineOneResult } from "../../src/import2define/import2defineOne";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";
import { expectCodeEquals } from '../testUtil';


describe('import2define', () => {

  describe('import2defineOne', () => {

    function test(source: string, expectedOutput: string, expectedErrors: string[] | number, fileName: string = 'test3.ts') {
      const project = new Project()
      const sourceFile = project.createSourceFile(fileName, source)
      const result: Import2DefineResult = {
        errors: [], perFileResults: []
      }
      const resultSingle = import2defineOne({
        tsconfigFilePath: 'doesntMatter.json',

      }, sourceFile, result)
      if (typeof expectedErrors === 'number') {
        expect(result.errors.length).toEqual(expectedErrors)

      } else {

        expect(result.errors).toEqual(expectedErrors)
      }
      if (resultSingle) {

        const output = printImport2DefineOneResult(resultSingle)

        expectCodeEquals(output, expectedOutput)
      }
      // else {
      //   fail('output undefined is an error')
      // }
    }

    //todo: errors, no import, default import, assign import namespace import
    it('single file', () => {

      test(`
import { a, b } from 'foo' 
export default const bar = 1
    `, `
import { Application } from 'sc-types-frontend'
define('test3', ['foo', 'foo'], function(a: any, b: any){
  const bar = 1
  return bar
})
    `,
        [])

    })

    it('exporting an imported thing', () => {

      test(`
import { a, b } from 'foo' 
export default const bar = a
    `, `
import { Application } from 'sc-types-frontend'
define('test3', ['foo', 'foo'], function(a: any, b: any){
  const bar = a
    
  return bar
})

    `,
        [])

    })


    it('exporting an imported thing 2', () => {
      test(`
import { a, b } from 'foo' 
export default a
            `, `
import { Application } from 'sc-types-frontend'
define('test3', ['foo', 'foo'], function(a: any, b: any){
  return a
})
            `,
        [])

    })


    it('exporting jsx', () => {
      test(`
export default <div></div>
            `,
        `import { Application } from 'sc-types-frontend' define('foo', [], function(){ return <div></div> })`,
        [], 'foo.tsx')
    })


    xit('exporting jsx as non default will fail', () => {// syntax error
      test(`
export <div></div>
            `,
        `import { Application } from 'sc-types-frontend' define('foo', [], function(){ return <div></div> })`,
        1, 'foo.tsx')
    })

    it('exporting array of references', () => {
      test(`
      import DeferredSpec from './DeferredSpec'
      import MainTest from './MainTest'
      
      export default [DeferredSpec, MainTest]
            `,
        `import { Application } from 'sc-types-frontend' define('foo', ['./DeferredSpec', './MainTest'], function(DeferredSpec: any, MainTest: any){ return [DeferredSpec, MainTest] })
            `,
        [], 'foo.ts')

    })

    it('exporting non default variables will fail', () => {
      test(`
export const a = 1
            `,
        undefined,
        1)

    })

    it('exporting default variable is ok', () => {
      test(`
export default const a = 1
            `,
        undefined,
        0)

    })

    it('exporting non default functions will fail', () => {
      test(`
export function f(){}
            `,
        undefined,
        1)

    })
    it('exporting default functions is ok', () => {
      test(`
export default function f(){}
            `,
        undefined,
        0)

    })

    it('exporting default fn call work', () => {
      test(`
export default f()
            `,
        undefined,
        0)

    })

    it('exporting non default literals will fail', () => {
      test(`
export 1
            `,
        undefined,
        1)

    })

    xit('exporting non default fn calls will fail', () => { // syntax error
      test(`
export f()
            `,
        undefined,
        1)

    })

    xit('exporting non default arrow fns will fail', () => { // this is syntax error
      test(`
export ()=>{}
            `,
        undefined,
        1)

    })



    it('exporting non default classes', () => {
      test(`
export class C{}
            `,
        undefined,
        1)

    })


    it('exporting function call', () => {
      test(`
      import {a} from './a'
      export default a()
            `, `import { Application } from 'sc-types-frontend' define('foo', ['./a'], function(a: any){ return a() })`,
        [], 'foo.ts')

    })


    it('exporting function call 2', () => {
      test(`
      export  default describe()
            `, `import { Application } from 'sc-types-frontend' define('foo', [], function(){ return describe() })`,
        [], 'foo.ts')

    })

    // it('should allow me to export just types', () => {
    //   test(`
    //   export interface A{}
    //   export type b = any
    //         `,`import { Application } from 'sc-types-frontend' define('foo', [], function(){ return describe() })`,
    //     [], 'foo.ts')

    // })

    it('should allow me to export just types', () => {
      test(`
export type f = any
export interface I {}
            `, undefined, [])

    })

    xit('support enums since is value', () => {
      test(`
export enum e {}
            `, `import { Application } from 'sc-types-frontend' define('foo', [], function(){ return describe() })`,
        [`You cannot export declaration with values unless they are default exports. Currently you have: ClassDeclaration export cla..., EnumDeclaration export enu...`])

    })

    xit('should allow to default export a type', () => { // nice to have but not improtant and missleading  
      test(`
export default interface I{}
            `, ``,
        [])

    })


    it('single variable reference exported separately', () => { //should work
      test(`
import { ExtensionEntryPoint, Utils } from 'sc-types-frontend'
const obj: ExtensionEntryPoint = {
  mountToApp: (container){
    alert(Utils.translate('hello'))
  }
}
export default const extension = obj
    `, `
import { ExtensionEntryPoint } from 'sc-types-frontend'
define('test3', ['Utils'], function(Utils: any){
  const obj: ExtensionEntryPoint = {
  mountToApp: (container){
    alert(Utils.translate('hello'))
  }
}
  const extension = obj
  return extension
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
export default const MyExtensionView: IMyExtensionView = BackboneView.extend({
  template, 
  play(){
    alert(Utils.translate('hello'))
  }
})
    `, `
import { View } from 'sc-types-frontend'
define('test3', ['Utils', 'Backbone.View', 'my_extension_view.tpl'], function(Utils: any, BackboneView: any, template: any){
  const MyExtensionView: IMyExtensionView = BackboneView.extend({
    template, 
    play(){
      alert(Utils.translate('hello'))
    }
  })
  return MyExtensionView
})
export interface IMyExtensionView extends View {
  play(): void
}    
`,
        [])
    })

    it('classed can be exported', () => {
      test(`
import { Model, BackboneModel } from 'sc-types-frontend';
export default class MineModel extends BackboneModel {
  async magick(t: 1 | 2 | 3 | 4): Promise<number> {
    await sleep(t)
    return t + 1
  }
}
    `,
        `
import { Model } from 'sc-types-frontend'
define('test3', ['Backbone.Model'], function(BackboneModel: any){
  return  class MineModel extends BackboneModel {
    async magick(t: 1 | 2 | 3 | 4): Promise<number> {
      await sleep(t)
      return t + 1
    }
  }
})
    `,
        [])
      //       const code1 = `
      // import { Model, BackboneModel } from 'sc-types-frontend';
      // export default class MineModel extends BackboneModel {
      //   async magick(t: 1 | 2 | 3 | 4): Promise<number> {
      //     await sleep(t)
      //     return t + 1
      //   }
      // }
      //   `
    })




    it('sc-types-frontend imports should not be converted unless they are contained in import2defineDefaults.suitecommerceSpecifiers', () => { //should work
      test(`
import { Utils, BackboneView, View, Foo, jQuery, BackboneModel, Model, BackboneCollection, Color, BackboneRouter } from 'sc-types-frontend'
import template from './my_extension_view.tpl'
export interface IMyExtensionView extends View {
  play(): void
}
export default const MyExtensionView: IMyExtensionView = BackboneView.extend({
  template, 
  play(){
    alert(Utils.translate('hello'))
  }
})
    `, `
import { View, Foo, Model, Color } from 'sc-types-frontend'
define('test3', ['Utils', 'Backbone.View', 'jQuery', 'Backbone.Model', 'Backbone.Collection', 'Backbone.Router', 'my_extension_view.tpl'], function(Utils: any, BackboneView: any, jQuery: any, BackboneModel: any, BackboneCollection: any, BackboneRouter: any, template: any){
  const MyExtensionView: IMyExtensionView = BackboneView.extend({
    template, 
    play(){
      alert(Utils.translate('hello'))
    }
  })
  return MyExtensionView
})
export interface IMyExtensionView extends View {
  play(): void
}
`,
        [])
    })


    // fails because it tranlate to define('x', [], function(){ const y = x + 2 return 1 }) / basically we 
    // cannot use the exported variable after the export statament. SOlution is to create a new variable 
    // and replace the return statemtn with it and then at the end return that.s
    xit('fails using exported variable below', () => {
      const code1 = `
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

      const a2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'a'))
      expectCodeEquals(a2, `
      import { Application } from 'sc-types-frontend'
define('a', ['b'], function(b: any){
  const a = 1   
  return a
})
`)

      const b2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'b'))
      expectCodeEquals(b2, `
      import { Application } from 'sc-types-frontend'
define('b', ['c'], function(c: any){
  const b  =2  
  return b
})
`)
      const c2 = printImport2DefineOneResult(result.perFileResults.find(r => r.sourceFile.getBaseNameWithoutExtension() === 'c'))
      expectCodeEquals(c2, `
      import { Application } from 'sc-types-frontend'
define('c', [], function(){
  const c  =3  
  return c
})
`)

    })

  })
  describe('errors', () => {
    xit('no default export', () => { })
    xit('no default export with classes/functions/variables', () => { })

  })

  describe('import2define', () => {
    it('write output project', () => {
      mkdir('-p', 'tmp')
      const outputFolder = getPathRelativeToProjectFolder('tmp/project1Outtt')
      rm('-rf', `${outputFolder}`)
      const result = import2define({
        tsconfigFilePath: getPathRelativeToProjectFolder(`spec/fixtures/project1/tsconfig.json`),
        outputFolder: outputFolder
      })
      expect(result.errors).toEqual([])
      expect(test(`-f`, `${outputFolder}/src/FrontEndSimple1.ListView.ts`)).toBe(true)
      expect(test(`-f`, `${outputFolder}/src/FrontEndSimpleEntry.ts`)).toBe(true)
    })

    it('tsx files', () => {
      mkdir('-p', 'tmp')
      const outputFolder = getPathRelativeToProjectFolder('tmp/project1Outtt33')
      rm('-rf', `${outputFolder}`)
      const result = import2define({
        tsconfigFilePath: getPathRelativeToProjectFolder(`spec/fixtures/tsxTest/tsconfig.json`),
        outputFolder: outputFolder, debug: true
      })
      result.perFileResults.forEach(f => {
        if (f.imports.length) {
          expect(test('-f', f.imports[0].importSpecifierSourceFile.getFilePath())).toBe(true)
        }
      })
    })

  })

  describe('getDefaultExportValue', () => {

    function test(code: string, expected: { error?: string | boolean, exportValue?: string, exportStatement?: Statement, exportName?: string, exportStatementText?: string }) {
      const project = new Project()
      const f = project.createSourceFile('test.ts', code)

      const info = getDefaultExportValue(f)
      // console.log({...info, exportStatementText: info.exportStatement&& info.exportStatement.getText(), exportStatement: undefined});
      if (typeof expected.error === 'boolean') {
        expect(info.error && info.error.length).toBeTruthy()
      } else {
        expect(info.error).toEqual(expected.error, code)
      }
      expect(info.exportValue).toEqual(expected.exportValue, code)
      expect(info.exportName).toEqual(expected.exportName, code)
      expect(info.exportStatement && info.exportStatement.getText()).toEqual(expected.exportStatementText, code)
    }
    it('export default const a = 1', () => {
      test(`export default const a = 1`, {
        exportValue: 'a',
        exportStatementText: 'export default',
        exportName: 'test',
      }
      )
    })
    it('export default function(){}', () => {
      test(`export default function(){}`, {
        exportValue: ' function(){}',
        exportStatementText: 'export default function(){}',
        exportName: 'test',
        error: undefined
      }
      )
    })
    it('const c = 1; export default c', () => {
      test(`const c = 1; export default c`, {
        exportValue: 'c',
        exportStatementText: 'export default c',
        exportName: 'test',
        error: undefined
      })
    })
    it('class A{}; export default A', () => {
      test(`class A{}; export default A`, {
        exportValue: 'A',
        exportName: 'test',
        error: undefined,
        exportStatementText: 'export default A'
      })
    })
    it('export default class {}', () => {
      test(`export default class {}`, {
        exportValue: ' class {}',
        exportName: 'test',
        error: undefined,
        exportStatementText: 'export default class {}'
      })
    })
    it(`import A from 'a'; export default  A`, () => {
      test(`import A from 'a'; export default  A`, {
        exportValue: 'A',
        exportName: 'test',
        error: undefined,
        exportStatementText: 'export default  A'
      })
    })

    it('export const a = 1', () => {
      test(`export const a = 1`, {
        // exportName: 'test',
        error: true,
        exportStatementText: undefined,
      })
    })

    it('export default interface {}', () => {
      test(`export default interface {}`, {
        error: 'No default export for class, variable or function found 2',
        exportStatementText: undefined,
      }
      )
    })

  })

})

