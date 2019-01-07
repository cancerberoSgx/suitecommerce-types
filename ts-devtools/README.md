These are code conversion tools that transform .ts project into SC AMD project that compatible with SC/SCA es5. A particular TS config is required and tslib will be added as a separate file that is required as dependency by .js emitted files. 

Is designed to work with sc-types-frontend so users import SC/SCA dependencies and types through it so the correct SC/SCA dependency object is returned. 

Related projects: 

# Requirements:

 * User able to write TypeScript project using latest standards, tsc, npm, etc
   * .js emitted code is :
     * valid AMD modules just like the rest of SCA
     * support es5
     * clean (no helper/ polly-fill overhead ) - so if decided project could be maintained from that output .js code and ts code discarded if decided. 
       * Heads up: async/await/generators, es5 output code is not so clean but acceptable. This could be alleviated by emitting / maintaining es6 (and other tool transpile it to es5) - is an inherent consequence of supporting es5... 
   * there should be no performance impact (cannot repeat helpers on each file)
   * only allowed to emit extra helpers/polly-fills in separate tslib AMD file required as dependency so helpers code is not repeated.

# status

 * mostly working without problems: input ts project must use sc-types-frontend to import SC dependencies and special TS configuration
 * tslib added as individual .js file and required as AMD any other dependency
 * example using JSX poorman's implementation to write view's html: 
   * TS source project: https://github.com/cancerberoSgx/suitecommerce-types/tree/master/sample-projects/jsx-view-tests
   * .js generated output: https://github.com/cancerberoSgx/suitecommerce-types/tree/master/sample-projects/jsx-view-tests/jsOutput/MyCoolModule

# design

 * `import2define()`: given a .ts input project using ES modules (import/export) , import2define() will:
   * transpile to .ts files that use define() AMD format that SuiteCommerce understand and 
   * makes sure the correct object/types are returned when importing SC dependency though cs-types-frontend. 
   * It also validates input modules (requires that value-declarations like classes, variables, functions) are default exported. 
   * Will use .ts fie basename as AMD dependency name. 
 * `compileTsProject()` given a TS project generated with import2define() will transpile it to .js files using special TS configuration, most importantly importing tslib and not emitting ts helpers
 * `fixJsFileAmdTslib()`: user tool that, transform .js project generated with compileTsProject() so tslib dependency is injected with AMD just as other library and adds tslib.js file to output project. See spec/fixJsFileAmdTslib/addTslibAmdDependencySpec.ts
 * `import2defineCompileAndFix()` orchestrate import2define(), compileTsProject() and import2defineCompileAndFix() in a single call()
 * CLI tool see spec/bin/binSpec.ts


 # TODO

 * watch mode so it compiles .ts files on change (WIP)
 * config.nsPackageJson so all other resources like .tpl, .scss, etc declared there are copied to output JS project ?
   * or generate ns.package.json ?
 * PERFORMANCE: compileTsProject should be executed programmatically now spawning tsc
 * PERFORMANCE: we are creating Project and SourceFile on each function - probably we can reuse project / source file instances
 * PERFORMANCE: Project with virtualFileSystem ? 
 * preserve indentation (probably we need to ask the user for a eslintrc and re-indent) / or let ts/simple/ast infer it from input ?

