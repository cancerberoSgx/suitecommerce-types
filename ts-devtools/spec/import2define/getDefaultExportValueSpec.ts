import { Project, Statement } from "ts-simple-ast";
import { getDefaultExportValue } from "../../src/import2define/getDefaultExportValue";

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