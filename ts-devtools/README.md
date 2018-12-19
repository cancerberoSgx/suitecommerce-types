# sc-tsc

**SuiteCommerce TypeScript Compiler and Developer tools**

Transform TypeScript projects into valid JavaScript AMD projects compatible with SuiteCommerce extensions and SuiteCommerce Advanced. 

Is designed to work with sc-types-frontend so users import SC/SCA dependencies and types through it so the correct SC/SCA dependency object is returned. 

# Usage

## Install

```
npm i -D sc-tsc
```

## command line

```
npx sc-tsc --tsconfigFilePath my/typescript/project/tsconfig.json --outputFolder my-sc-extensions-workspace/Workspace/Test3/Modules/BackboneSimpleTest1
```

### Command line options

 * `tsconfigFilePath` (`string`): mandatory - assumes tsconfig.json file is in the root project path. The project must have typescript installed locally and that will be used to compile
 * `outputFolder` (`string`): optional - if not given will use given tsconfig.json default dest
 * `cleanOutputFolder` (`boolean`): optional - 
 * `breakOnFirstError` (`boolean`): optional - if true will abort on any error
 * `skipLinkInputProjectFiles` (`boolean`): optional - if outputFolder is declared then all input project files like node_modules, package.json, etc need to be present in the new project for it work. Set this to true to not do it so.
 * `debug` (`boolean`): optional - 
 * `addTslibJsInFolder` (`string`): optional - if set, it will add tslib.js (AMD module) in given path that must be relative to \`tsconfigJsonPath\`
 * `outputFolder` (`string`): mandatory - 
 * `formatJsOutput` (`boolean`): optional - if true it will format generated .js output files using TypeScript formatting API
 * `addExtraAmdDependendenciesForSCAUnitTests` (`string`): optional - comma separated of extra SCA AMD dependencies that will be added to the end of the list on each file. This is a workaround so SCA gulp local and gulp unit-test works since SCA issue regarding not requiring necessary dependencies automatically
 * `customImportSpecifiers` (`CustomImportSpecifier[]`): optional - 
 * `ignoreImportSpecifiers` (`IgnoreImportSpecifier[]`): optional - 




### Command line build script example

See https://github.com/cancerberoSgx/suitecommerce-types/blob/master/sample-projects/backbone-simple/build.sh for a build script supporting both SCA and SC extensions deploys, local and unit-tests gulp commands

## API

TODO - not really important to document I think


# status

 * Supports SCA: `gulp deploy`, `gulp local`, `gulp unit-test`
 * Supports SC Extensions: `gulp extension:deploy`, `gulp extension:local`
 * mostly working without problems: input ts project must use sc-types-frontend to import SC dependencies and special TS configuration
 * tslib added as individual .js file and required as AMD any other dependency

# design

Notes on important APIs and implementation: 

 * `import2define()`: given a .ts input project using ES modules (import/export) , import2define() will:
   * transpile to .ts files that use define() AMD format that SuiteCommerce understand and 
   * makes sure the correct object/types are returned when importing SC dependency though cs-types-frontend. 
   * It also validates input modules (requires that value-declarations like classes, variables, functions) are default exported. 
   * Will use .ts fie basename as AMD dependency name. 
 * `compileTsProject()` given a TS project generated with import2define() will transpile it to .js files using special TS configuration, most importantly importing tslib and not emitting ts helpers
 * `fixJsFileAmdTslib()`: user tool that, transform .js project generated with compileTsProject() so tslib dependency is injected with AMD just as other library and adds tslib.js file to output project. See spec/fixJsFileAmdTslib/addTslibAmdDependencySpec.ts
 * `import2defineCompileAndFix()` orchestrate import2define(), compileTsProject() and import2defineCompileAndFix() in a single call()
 * CLI tool see spec/bin/binSpec.ts

## design requirements

 * User able to write TypeScript project using latest standards, tsc, npm, etc
   * .js emitted code is :
     * valid AMD modules just like the rest of SCA
     * support es5
     * clean (no helper/ polly-fill overhead ) - so if decided project could be maintained from that output .js code and ts code discarded if decided. 
       * Heads up: async/await/generators, es5 output code is not so clean but acceptable. This could be alleviated by emitting / maintaining es6 (and other tool transpile it to es5) - is an inherent consequence of supporting es5... 
   * there should be no performance impact (cannot repeat helpers on each file)
   * only allowed to emit extra helpers/polly-fills in separate tslib AMD file required as dependency so helpers code is not repeated.


 # TODO

 * change folder name to sc-tsc (the project name)
 * make output js files and module names unique - user can use simple names in its code and the compiler adds a prefix to all user's project module names. 
 * embedd images / resources (import icon from './icon.svg)
 * 'npm install some-lib' and maintain its dependency in package.json.
 * watch mode so it compiles .ts files on change (WIP)
 * config.nsPackageJson so all other resources like .tpl, .scss, etc declared there are copied to output JS project ?
   * or generate ns.package.json ?
 * PERFORMANCE: compileTsProject should be executed programmatically now spawning tsc
 * PERFORMANCE: we are creating Project and SourceFile on each function - probably we can reuse project / source file instances
 * PERFORMANCE: Project with virtualFileSystem ? 
 * preserve indentation (probably we need to ask the user for a eslintrc and re-indent) / or let ts/simple/ast infer it from input ?

