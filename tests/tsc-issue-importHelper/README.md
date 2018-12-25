if a .ts file doesnt import/export then     "importHelpers": true, stops working, see src/MineModel.ts

reproduce: 

npm i && tsc

expected: both transpiled files in dist should have tslib import statemtne like 
var tslib_1 = require("tslib");

actual: tests/tsc-issue-importHelper/dist/src/MineModel.js see comments in that file for more info

Note: doesnt seem to be related  by complexity or by compilation errors, 