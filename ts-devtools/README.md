These are code conversion tools that transform .ts project into SC AMD project that compatible with SC/SCA es5. A particular TS config is required and tslib will be added as a separate file that is required as dependency by .js emitted files. 

Is designed to work with sc-types-frontend so users import SC/SCA dependencies and types through it so the correct SC/SCA dependency object is returned. 

Related projects: 

# Requirements:

 * User able to write TypeScript project 
   * .js emitted code is :
   * valid AMD modules just like the rest of SCA
   * support es5
   * output .js code is clean (no helper/ pollyfill overhead ) - so if decided project could be maintained from that output .js code and ts code discarded if decided.
   * there should be no performance impact (cannot repeat helpers on each file)
   * only extra code in separate tslib AMD file required as dependency.


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

 * import2define copy .tpl, .scss, etc files to output ?
 * generate ns.package.json ?
 * watch mode so it compiles .ts files on change WIP
 * compileTsProject should be executed programmatically now spawning tsc
 * preserve indentation (probably we need to ask the user for a eslintrc and reindent) / or let ts/simple/ast infer it from input ?




# OLD - Possible solution:

1) * compile using:

```
 "target": "es5",
    "module": "commonjs",
 "noEmitHelpers": true,
 "importHelpers": true,
```

2) postprocess .js file and change it from this:

```

var tslib_1 = require("tslib");
define('FrontEndSimpleEntry', ['FrontEndSimple1.ListView'], function (Simple1ListViewConstructor) { return ({
    mountToApp: function (application) {
        var _this = this;
        application.getLayout().on('afterAppendView', function (view) { return tslib_1.__awaiter(_this, void 0, void 0, 
        ```
to this:

```
var tslib_1 = require("tslib");
define('FrontEndSimpleEntry', ['FrontEndSimple1.ListView', 'tslib'], function (Simple1ListViewConstructor, tslib_1) { return ({
    mountToApp: function (application) {
        var _this = this;
        application.getLayout().on('afterAppendView', function (view) { return tslib_1.__awaiter(_this, void 0, void 0, 
```

3) pack tslib as a SC module or just a .js file so is easy for users to include it in their SC builds.
Note: tslib is amd/umd compatible https://github.com/Microsoft/tslib/blob/master/tslib.js so we should publish it as SC module. 

