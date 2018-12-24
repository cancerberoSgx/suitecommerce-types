import { readFileSync } from "fs";
import { resolve } from "path";
import { rm, test } from "shelljs";
import { compileAndFix } from "../../src/compileAndFix/compileAndFix";
import { export2define } from "../../src/import2define/import2define";
import { expectCodeNotToContain, expectCodeToContain } from "../testUtil";

describe('compileAndFix', () => {

  it('basic, project: ../sample-projects/frontend-simple1/', () => {
    const outputFolder = './dist/testdist'
    const tsconfigFilePath = `../sample-projects/frontend-simple1/tsconfig.json`
    rm('-rf', outputFolder)
    const config = { outputFolder, tsconfigFilePath, breakOnFirstError: true, addTslibJsInFolder: `${resolve(outputFolder)}/src` }
    const result = compileAndFix(config)
    expect(result.errors.length).toBe(0)
    const aFile = readFileSync(`${outputFolder}/src/FrontEndSimple1.ListView.js`).toString()
    expect(aFile).toContain(`define('FrontEndSimple1.ListView', ['frontend_simple1_listview.tpl', 'Backbone', "tslib"], function (template, Backbone, tslib_1)`)
    expect(aFile).not.toContain(`require("tslib")`)
    expect(test('-f', `${outputFolder}/src/tslib.js`)).toBe(true)
  })

  it('together with export2define, project: spec/fixtures/project1/', () => {
    let inputFolder = 'spec/fixtures/project1/'
    let outputFolder = './dist/project2'
    rm('-rf', outputFolder)
    const export2defineResult = export2define({
      tsconfigFilePath: `${inputFolder}/tsconfig.json`,
      outputFolder
    })
    expect(export2defineResult.errors).toEqual([])

    inputFolder = './dist/project2'
    outputFolder = './dist/project2_out'
    rm('-rf', outputFolder)
    const result = compileAndFix({
      outputFolder,
      tsconfigFilePath: `${inputFolder}/tsconfig.json`,
      breakOnFirstError: true,
      addTslibJsInFolder: `${resolve(outputFolder)}/src`
    })
    expect(result.errors.length).toBe(0)
    const aFile = readFileSync(`${outputFolder}/src/FrontEndSimple1.ListView.js`).toString()
    expectCodeToContain(aFile, `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
define('FrontEndSimple1ListView', ['frontend_simple1_listview.tpl', "tslib"], function (template, tslib_1) {
    var Backbone = null;
        `)
    expectCodeToContain(aFile, `
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        define('FrontEndSimple1ListView', ['frontend_simple1_listview.tpl', "tslib"], function (template, tslib_1) {
            var Backbone = null;
                `)
    expectCodeNotToContain(aFile, `require("tslib")`)
    expect(test('-f', `${outputFolder}/src/tslib.js`)).toBe(true)
  })

})