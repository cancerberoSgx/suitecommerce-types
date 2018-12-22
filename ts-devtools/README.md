user tool that, given a folder with .ts files will transpile to .js files that SuiteCOmmertce understand. 

# Requirements:

 * must support es5 target output
 * there should be an output (perhaps not es5) that is clean, very clean without helpers, es2018, so others can read .js clearly.
 * there should be no performance impact (cannot repeat helpers on each file)


# status

 * .js file fixer, see spec/fixJsFileAmdTslibSpec.ts
 * compile project and fix emitted files, see spec/compileAndFix/compileAndFixSpec.ts



 # TODO
 * add tslib.js AMD module and perhaps generate ns.package.json
 * watch mode so it compiles .ts files on change
 * preserve indentation (probably we need to ask the user for a eslintrc and reindent)




# OLD - Posible solution:

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

