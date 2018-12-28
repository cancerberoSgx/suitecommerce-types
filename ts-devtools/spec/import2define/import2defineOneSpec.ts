import { Project } from "ts-simple-ast";
import { Import2DefineResult } from "../../src/import2define/import2define";
import { import2defineOne, printImport2DefineOneResult } from "../../src/import2define/import2defineOne";
import { expectCodeEquals, expectCodeToContain } from '../testUtil';

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
      const output = printImport2DefineOneResult(resultSingle, false)
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
  // })





  // })

})

