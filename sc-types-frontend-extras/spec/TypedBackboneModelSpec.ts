import { expectType } from 'tsd-check';
import {TypedBackboneModel} from '../src'
import {Project, Diagnostic} from 'ts-simple-ast'

describe('TypedBackboneModel', () => {
  function compile(code:string): {diagnostics: Diagnostic[], diagnosticFormatted: string}{
    const p = new Project({tsConfigFilePath: './tsconfig.json', useVirtualFileSystem: true})
    const f = p.createSourceFile('_test_.ts', code, {overwrite: false})
    const diagnostics = f.getPreEmitDiagnostics()
    const diagnosticFormatted = p.formatDiagnosticsWithColorAndContext(diagnostics)
    return {diagnostics, diagnosticFormatted}
  }

  interface ExpectCompileConfig{
    code: string
    expectErrorMsgToContain?: string
  }
  function expectCompileFail(config: ExpectCompileConfig){
    const {diagnosticFormatted} = compile(config.code)
    expect(diagnosticFormatted).toBeDefined()
    if(config.expectErrorMsgToContain){
      expect(diagnosticFormatted).toContain(config.expectErrorMsgToContain)
    }
  }

  function expectCompileSuccess(config: ExpectCompileConfig){
    const {diagnosticFormatted} = compile(config.code)
    expect(diagnosticFormatted).not.toBeDefined()
  }

  it('should fail if setting incorrect attrs', () => {

    expectCompileFail({code: `
    import {TypedBackboneModel} from '.'
    interface A {name:string}
    class M extends TypedBackboneModel<A>{}
    const m = new M()
    m.setAttributes({foo:1})
    `, expectErrorMsgToContain: `Object literal may only specify known properties, and 'foo' does not exist in type 'Partial<A>'`})
    // expectCompileSuccess(`
    // import {TypedBackboneModel} from '.'
    // interface A {name:string}
    // class M extends TypedBackboneModel<A>{}
    // const m = new M()
    // m.setAttributes({foo:1})
    // `)
    

    // expectType<X>({ a: 1 });
    expect(true).toBe(true)
  })
})