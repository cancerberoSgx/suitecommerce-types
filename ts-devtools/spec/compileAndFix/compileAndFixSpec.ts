import { readFileSync } from "fs";
import { resolve } from "path";
import { rm, test, mkdir } from "shelljs";
import { compileAndFix } from "../../src/compileAndFix/compileAndFix";
import { import2define } from "../../src/import2define/import2define";
import { expectCodeNotToContain, expectCodeToContain } from "../testUtil";
import { getNodeModulesFolderPath, getPathRelativeToProjectFolder } from "../../src/util/misc";

describe('compileAndFix', () => {

  it('basic, project: ../sample-projects/frontend-simple1/', () => {
    mkdir('-p', 'tmp')
    getNodeModulesFolderPath
    const outputFolder = getPathRelativeToProjectFolder('tmp/testdist')
    const tsconfigFilePath = getPathRelativeToProjectFolder(`../sample-projects/frontend-simple1/tsconfig.json`)
    rm('-rf', outputFolder)
    const config = {
      outputFolder, tsconfigFilePath,
      breakOnFirstError: true,
      addTslibJsInFolder: `src`,
      debug: true
    }
    const result = compileAndFix(config)
    expect(result.errors).toEqual([])
    const aFile = readFileSync(`${outputFolder}/src/FrontEndSimple1.ListView.js`).toString()
    expect(aFile).toContain(`define('FrontEndSimple1.ListView', ['frontend_simple1_listview.tpl', 'Backbone', "tslib"], function (template, Backbone, tslib_1)`)
    expect(aFile).not.toContain(`require("tslib")`)
    expect(test('-f', `${outputFolder}/src/tslib.js`)).toBe(true)
    result.emittedFileNames.forEach(f =>
      expect(readFileSync(f).toString()).not.toContain(`Object.defineProperty(exports, "__esModule", { value: true });`)
    )
  })

  it('together with export2define, project: spec/fixtures/project1/', () => {
    mkdir('-p', 'tmp')
    let inputFolder = getPathRelativeToProjectFolder('spec/fixtures/project1/')
    let outputFolder = getPathRelativeToProjectFolder('tmp/project2')
    rm('-rf', outputFolder)
    const export2defineResult = import2define({
      tsconfigFilePath: `${inputFolder}/tsconfig.json`,
      outputFolder
    })
    expect(export2defineResult.errors).toEqual([])

    inputFolder = outputFolder
    outputFolder = getPathRelativeToProjectFolder('tmp/project2_out')
    rm('-rf', outputFolder)
    const result = compileAndFix({
      outputFolder,
      debug: true,
      tsconfigFilePath: `${inputFolder}/tsconfig.json`,
      breakOnFirstError: true,
      addTslibJsInFolder: `src`
    })
    expect(result.errors).toEqual([])
    const aFile = readFileSync(`${outputFolder}/src/FrontEndSimple1.ListView.js`).toString()
    expectCodeToContain(aFile, `
"use strict";
define('FrontEndSimple1ListView', ['frontend_simple1_listview.tpl', 'Backbone.Model', 'Backbone.View', "tslib"], function (template, BackboneModel, BackboneView, tslib_1) {
    var v = 1234;
    return BackboneView.extend({
        template: template,
        events: {
            '[data-action="validate"]': 'customValidation'
        },
        getContext: function () {
            return {
                foo: 1
            };
        },
        model: new BackboneModel(),
        customValidation: function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
    `)

    expectCodeNotToContain(aFile, `require("tslib")`)
    expect(test('-f', `${outputFolder}/src/tslib.js`)).toBe(true)
  })

})