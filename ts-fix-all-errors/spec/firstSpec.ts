import { Project, SourceFile, Identifier, SyntaxKind, TypeGuards, TextChange, VariableDeclaration } from "ts-simple-ast";
import { fixProjectErrors, fixSourceFileErrors } from "../src";
import { mkdir, exec, rm, config } from "shelljs";
import { writeFileSync } from "fs";
import { unique } from "./testUtil";

config.silent=true
describe('first', ()=>{
  beforeAll(()=>{
    rm('-rf', 'tmp')
  })
  function test(code: string,  equivalentJsCode: string, fileName:string='f1.ts'){
    const p = new Project({compilerOptions:{strict: true, allowJs: true, checkJs: true, outDir: 'dist', removeComments: false}})
    p.createSourceFile(fileName, code)
    expect(p.getSourceFile(fileName).getPreEmitDiagnostics().length).toBeGreaterThan(0)
    fixSourceFileErrors(p.getSourceFile(fileName))
    // console.log(p.getSourceFile(fileName).getText());
    expect(p.getSourceFile(fileName).getPreEmitDiagnostics().length).toBe(0)
    
    const emitted = p.getSourceFile(fileName).emit()
    expect(emitted.getDiagnostics().length).toBe(0)
    expect(emitted.getEmitSkipped()).toBe(false)

    mkdir('-p', 'tmp')
    const fname = `tmp/${unique()}.js`
    writeFileSync(fname, p.getSourceFile(fileName).getEmitOutput().getOutputFiles()[0].getText())
    const g1 = exec(`node ${fname}`)
    expect(g1.code).toBe(0)

    const fname2 = `tmp/${unique()}.js`
    writeFileSync(fname2, equivalentJsCode)
    const g2 = exec(`node ${fname2}`)
    expect(g2.code).toBe(0)

    expect(g1.stdout).toBe(g2.stdout)
    expect(g1.stderr).toBe(g2.stderr)

  } 

  it('call any with type params', ()=>{
    test(`
    export function f(Something: any): void {
      return new Something<string>(2).fill(0).join(',')
    }
    console.log(f(Array))
    `, `console.log(new Array(2).fill(0).join(','))`
    )
  })

  it('object literal property', ()=>{
    test(`
    const dontExists: string = function(){return 3} as string
    const o = {
      a: 1, 
      b: dontExists
    }
    console.log(o.b())
    `, `
    console.log(3)
    `)
  })

  it('code inside string template', ()=>{
    test(`
    const a = 1
    const foo: number = ()=>2 as number
    console.log(\`\${foo()}\`)
    `, `
    console.log(2)
    `)
  })

  it('code inside string template with new lines', ()=>{
    test(`
    const foo: number = ()=>2 as number
    const c = \`
    \${foo()}
    \`
    console.log(c)
    `, `
    const foo = ()=>2
    const c = \`
    \${foo()}
    \`
    console.log(c)`)
  })

  xit('code inside string template with new lines', ()=>{
    const code = `

    type _un2_iQu3_<I=any,J=any,K=any,L=any,M=any>=any
    type BackboneView<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
    type BackboneModel<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
    type PluginContainer<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
    type ReactLike<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
    type JSXTemplate<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
    type JSXView<I=(any|_un2_iQu3_),J=(any|_un2_iQu3_),K=(any|_un2_iQu3_),L=(any|_un2_iQu3_),M=(any|_un2_iQu3_)>=any|_un2_iQu3_
    
    import { TemplateContext, Plugin } from 'sc-types-frontend'
    define('JSXView', ['Backbone.View', 'Backbone.Model', 'PluginContainer', 'ReactLike', 'JSXTemplate'], function(BackboneView: any, BackboneModel: any, PluginContainer: any, ReactLike: any, JSXTemplate: any){
      function isJSXView(view: any): view is JSXView<any, any> {
      return (view as any).jsxTemplate
    }
    
      return  class JSXView<Model extends BackboneModel, Context extends TemplateContext> extends BackboneView<Model, Context> {
      template = (...args: any[]) => ''
      jsxTemplate: JSXTemplate<Context>
      initialize(options: any) {
        super.initialize(options)
        if (!this.preRenderPlugins) {
          this.preRenderPlugins = new PluginContainer<JQuery<HTMLElement>, [BackboneView]>()
        }
        this.preRenderPlugins.install({
          name: 'jsx',
          execute($fragment, view) {
            debugger
            if (isJSXView(view)) {
              ReactLike.renderDOM($fragment.get(0), view.jsxTemplate(view.getContext()))
            }
            return $fragment
          }
        })
      }
    }
    })
    `
    const p = new Project()
    const f = p.createSourceFile('f.ts', code)
    fixSourceFileErrors(f)
    console.log(p.getSourceFile('f.ts').getText());
    
  })


})

