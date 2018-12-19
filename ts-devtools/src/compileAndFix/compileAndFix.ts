import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname, sep, basename } from "path";
import { fixJsFileAmdTslib } from "../fixAmdTslib/fixJsFileAmdTslib";
import { FixAmdTslibResult } from "../fixAmdTslib/types";
import { compileTsProject } from "../util/compileTsProject";
import { addTslibJsInFolder } from "./addTslibJsInFolder";
import { mv } from "shelljs";

export interface AbstractConfig {
  /** assumes tsconfig.json file is in the root project path. The project must have typescript installed locally and that will be used to compile */
  tsconfigFilePath: string

  /** if not given will use given tsconfig.json default dest */
  outputFolder?: string

  // /**user can pass some custom config here . TODO*/
  // tsConfig?: {
  //   target: 'es5' | 'es6' //TODO
  // }
  cleanOutputFolder?: boolean

  /** if true will abort on any error */
  breakOnFirstError?: boolean // TODO: test

  /** if outputFolder is declared then all input project files like node_modules, package.json, etc need to be present in the new project for it work. Set this to true to not do it so. */
  skipLinkInputProjectFiles?: boolean;

  // /**
  //  * if true will run `npx eslint --fix` before writing the files using the target project cwd. 
  //  * Note that the target project needs to have support for eslint (all dependencies installed locally)
  //  * and have a tslintrc file available since the project will be defining indentation style.
  //  * */
  // eslintFix?: boolean,

  debug?: boolean


  /** 
   * If specified all dependency names will be prefixed with it. 
   * This way, one can make sure AMD dependency names don't collide with other modules so it's possible to use 
   * simple file names like `Manager.ts`. Also output .js file names will be prefixed
   */
  dependencyPrefix?: string
}

export interface CompileAndFixConfig extends AbstractConfig {
  /** if set, it will add tslib.js (AMD module) and other extra modules, in given path. If path is relative it will be  relative to `tsconfigJsonPath`. If you don't pass the argument the value will be 'src'. Passing value '0' won't add any file (internal use) */
  addTslibJsInFolder?: string
  outputFolder: string
  /** if true it will format generated .js output files using TypeScript formatting API */
  formatJsOutput?: boolean

  /** comma separated of extra SCA AMD dependencies that will be added to the end of the list on each file. This is a workaround so SCA gulp local and gulp unit-test works since SCA issue regarding not requiring necessary dependencies automatically */
  addExtraAmdDependendenciesForSCAUnitTests?: string

}

export interface AbstractResult {
  errors: string[]
  emittedFileNames?: string[]
  tslibFinalDest?: string
}

export interface CompileAndFixResult extends AbstractResult {
  /** the final tsc command used to compile the project */
  tscFinalCommand: string
  // emittedFileNames?: string[]
  postProcessResults?: (FixAmdTslibResult & { fileName: string })[]
}

/** 
 * given an input TS project using define() (not import/export) will 
 * will run tsc with approrpiate args (target) and then fixJsFileAmdTslib() and addTslibAmd() 
 * so the output JS project is AMD understandable by SC
 * 
 * Notice that input project can import only types (ie: sc-types-frontend)
 */
export function compileAndFix(config: CompileAndFixConfig): CompileAndFixResult {
  config.tsconfigFilePath = resolve(config.tsconfigFilePath)
  config.outputFolder = config.outputFolder ? resolve(config.outputFolder) : config.outputFolder

  const result = compileTsProject(config)
  if (result.errors.length) {
    return { ...result }
  }

  let error = false
  const filesWithErrors: string[] = []
  let errors: string[] = []
  const postProcessResults = result.emittedFileNames
    .map(fileName => {
      const result = fixJsFileAmdTslib({
        inputCode: readFileSync(fileName).toString(),
        formatJsOutput: config.formatJsOutput,
        addExtraAmdDependendenciesForSCAUnitTests: config.addExtraAmdDependendenciesForSCAUnitTests
      })
      errors = errors.concat(result.errors)
      if (error || config.breakOnFirstError && result.errors.length) {
        error = true
        filesWithErrors.push(fileName)
        return undefined
      }
      // post-process output code for clean-up and we are done:
      result.outputCode = postProcessEmittedJs(result.outputCode)
      writeFileSync(fileName, result.outputCode)
      return { ...result, fileName }
    })
    .filter(r => r)

  const tslibFinalDest = addTslibJsInFolder(config)

  if(config.dependencyPrefix){
    result.emittedFileNames = result.emittedFileNames || []
    result.emittedFileNames.map(file=>{
      const newName = dirname(file)+sep+config.dependencyPrefix+basename(file)
      mv(file, newName)
      return newName
    })

  }

  return {
    errors: errors.concat(error ? [`There were errors processing ${filesWithErrors.length} files, see postProcessResults`] : []),
    tscFinalCommand: result.tscFinalCommand,
    emittedFileNames: result.emittedFileNames,
    postProcessResults,
    tslibFinalDest
  }
}

function postProcessEmittedJs(s: string): string {
  // s = removeObjectDefineTopDeclaration(s)
  s = removeUnwantedLines(s)
  return s
}

// function removeObjectDefineTopDeclaration(s: string): string {
//   //removing ts commonsjs module Object.define... statement since it breaks with 'exports' is not defined in the browser since we are not bundling
//   // TODO: do this better / quotes/format might change and this fails
//   const toRemove = `Object.defineProperty(exports, "__esModule", { value: true });`

//   return s.replace(toRemove, ``)

//   //TODO: remove these strings: 
//   // /*return*/
//   // /** @class */
//   // //@ts-ignore
//   //  /*yield*/

// }

function removeUnwantedLines(s: string): string {
  //removing require("sc-types-frontend") declarations that might be still there and break SC
  // TODO: do this better / quotes/format might change and this fails
  const lines = s.split('\n')
    .filter(line => !(
      line.includes(`require("sc-types`) ||
      line.includes(`require('sc-types`) ||
      line.match(/^\s*\/\/\s*@ts\-ignore\s*$/) ||
      (line.trim() === '"use strict";') ||
      (line.trim() === `Object.defineProperty(exports, "__esModule", { value: true });`)
      )
    )
  return lines.join('\n')
}

