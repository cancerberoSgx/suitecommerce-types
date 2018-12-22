import { writeFileSync } from "fs";
import { config, exec, mkdir, rm } from "shelljs";
import { Project } from "ts-simple-ast";
import { fixProjectErrors } from "../src/fixProjectErrors";
import { fixProjectSourceFileErrors } from "../src/fixSourceFileErrors";
import { unique } from "./testUtil";

config.silent=true
describe('fixSourceFileErrors', ()=>{
  beforeAll(()=>{
    rm('-rf', 'tmp')
  })
  function createProject(code: string, fileName: string='f1.ts'){
    const project = new Project({compilerOptions:{strict: true, allowJs: true, checkJs: true, outDir: 'dist', removeComments: false}})
    const sourceFile = project.createSourceFile(fileName, code)
    return {project, sourceFile}
  }

  function test(code: string,  equivalentJsCode: string, fileName:string='f1.ts'){
    const {project} = createProject(code, fileName)
    expect(project.getSourceFileOrThrow(fileName).getPreEmitDiagnostics().length).toBeGreaterThan(0)
    fixProjectSourceFileErrors({sourceFile: project.getSourceFileOrThrow(fileName), project})
    expect(project.getSourceFileOrThrow(fileName).getPreEmitDiagnostics().length).toBe(0)
    
    const emitted = project.getSourceFileOrThrow(fileName).emit()
    expect(emitted.getDiagnostics().length).toBe(0)
    expect(emitted.getEmitSkipped()).toBe(false)

    mkdir('-p', 'tmp')
    const fileName2 = `tmp/${unique()}.js`
    writeFileSync(fileName2, project.getSourceFileOrThrow(fileName).getEmitOutput().getOutputFiles()[0].getText())
    const g1 = exec(`node ${fileName2}`)
    expect(g1.code).toBe(0)

    const fileName3 = `tmp/${unique()}.js`
    writeFileSync(fileName3, equivalentJsCode)
    const g2 = exec(`node ${fileName3}`)
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
    const project = new Project()
    const f = project.createSourceFile('f.ts', code)
    fixProjectSourceFileErrors({sourceFile: f, project})
    console.log(project.getSourceFileOrThrow('f.ts').getText());
    
  })



  it('problem with new()', ()=>{
    const code = `
    function f(){}
    var C = f()
    const b = new C({foo: 1})
    `
    const {project, sourceFile} = createProject(code, 'foo.ts')
    fixProjectErrors({project, dontSave: true})
    expect(project.getSourceFileOrThrow('foo.ts').getText()).toContain(`
var C = f()
//@ts-ignore
    const b = new C({foo: 1})   
    `.trim())
    // console.log();
  })

  xit('problem in compiled with any and new()', ()=>{
    // const code = `
    // function f(){}
    // var C = f()
    // const b = new C({foo: 1})
    // `
    // // const {project, sourceFile} = createProject(code, 'foo.ts')
    const project = new Project({tsConfigFilePath: '/home/sg/git/suitecommerce-types/sc-types-frontend-extras/compiled_ts/tsconfig.json'})
    fixProjectErrors({project})
//     expect(project.getSourceFileOrThrow('foo.ts').getText()).toContain(`
// var C = f()
// //@ts-ignore
//     const b = new C({foo: 1})   
//     `.trim())
    // console.log();
  })
  // /home/sg/git/suitecommerce-types/sc-types-frontend-extras/compiled_ts/tsconfig.json

})




