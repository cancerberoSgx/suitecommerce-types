a simple example for a SC frontend (JavaScript) module, written with TypeScript strongly typed and using latest ecma features and then tranpiled to es5

Notes: transpiling advanced stuff liks async to es5 will make tsc to emit helper functions on each file which could have performance impact. If we compile with:

‘‘‘

    "noEmitHelpers": true,
    "importHelpers": true,
    ‘‘‘
Then helpers are not emited at all and referenced from an imported library:

‘‘‘
var tslib_1 = require("tslib");
define('FrontEndSimpleEntry', ['FrontEndSimple1.ListView'], function (Simple1ListViewConstructor) { return ({
    mountToApp: function (application) {
      ...
            return tslib_1.__generator(this, function (_a) {
                ‘‘‘‘

Note: the require( could be configure to be amd  - but I think the best idea is to do a post process of emitted files and replace ‘ = require("tslib");‘ with a global variable and make sure al helpers are combined in the final js into that globnal object.