import Project from "ts-simple-ast";
import { export2defineSingleFile, Export2DefineResult } from "../../src/import2define/import2define";

describe('export2define', () => {
  describe('export2defineSingleFile', () => {

    function test(source: string, expectedOutput: string, expectedErrors: string[]) {
      const project = new Project()
      const sourceFile = project.createSourceFile('test3.ts', source)
      const result: Export2DefineResult = {
        errors: []
      }
      const output = export2defineSingleFile({
        tsconfigJsonPath: 'doesntMatter.json',

      }, sourceFile, result)
      expect(result.errors).toEqual(expectedErrors)
      expect(output).toContain(expectedOutput.trim())
    }

    //todo: errors, no import, default import, assign import namespace import
    it('single file', () => {

      test(`
import {a, b} from 'foo' 
export const bar = 1
    `, `
define('bar', ['foo', 'foo'], function('a', 'b'){
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
define('extension', ['Util'], function('Util'){
  return obj
})
`,
        [])
    })
  })
})
