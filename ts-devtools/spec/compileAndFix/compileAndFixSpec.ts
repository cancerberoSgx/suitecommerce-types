import { addTslibAmdDependency } from "../../src/fixAmdTslib/addTslibAmdDependency";
import { compileAndFix } from "../../src/compileAndFix/compileAndFix";
import { rm, test } from "shelljs";
import { readFileSync } from "fs";
import { resolve } from "path";

describe('compileAndFix', () => {
    it('basic', () => {
        const outputFolder = './dist/testdist'
        rm('-rf', outputFolder)
        const tsconfigFilePath=`../sample-projects/frontend-simple1/tsconfig.json` //: './tsconfig.json'
        const config={ outputFolder, tsconfigFilePath, breakOnFirstError: true, addTslibJsInFolder: `${resolve(outputFolder)}/src` }
        console.log(config);
        
        const result = compileAndFix(config)
        expect(result.errors.length).toBe(0)
        const aFile = readFileSync('dist/testdist/src/FrontEndSimple1.ListView.js').toString()
        expect(aFile).toContain(`define('FrontEndSimple1.ListView', ['frontend_simple1_listview.tpl', 'Backbone', "tslib"], function (template, Backbone, tslib_1)`)
        expect(aFile).not.toContain(`require("tslib");`)
        expect(test('-f', 'dist/testdist/src/tslib.js')).toBe(true)
        // console.log('\n\n', JSON.stringify(result, null, 2) );
    })
})