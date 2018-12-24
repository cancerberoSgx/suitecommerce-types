import { tempdir } from "shelljs";
import { readFileSync, writeFileSync } from "fs";
import { fixJsFileAmdTslib } from "../fixAmdTslib/fixJsFileAmdTslib";
import { FixAmdTslibResult } from "../fixAmdTslib/types";
import { addTslibAmd } from "./addTslibAmd";
import { compileTsProject } from "../util/compileTsProject";

export interface AbstractConfig {
  /** assumes tsconfig.json file is in the root project path. The project must have typescript installed locally and that will be used to compile */
  tsconfigJsonPath: string

  /** if not given will use given tsconfig.json default dest */
  outputFolder?: string

  /**user can pass some custom config here . TODO*/
  tsConfig?: {
    target: 'es5' | 'es6' //TODO
  }
  cleanOutputFolder?: boolean
  breakOnFirstError?: boolean
  /**if true will run `npx eslint --fix` before writing the files using the target project cwd. 
   * Note that the target project needs to have support for eslint (all dependencies installed locally)
   * and have a tslintrc file available since the project will be defining indentation style.*/
  eslintFix?: boolean,
  /** if set, it will add tslib.js (AMD module) in given path that must be relative to `tsconfigJsonPath`*/
}
export interface CompileAndFixConfig extends AbstractConfig {

  addTslibJsInFolder?: string
}
export interface AbstractResult {
  errors: string[]
  /** the final tsc command used to compile the project */

  emittedFilePaths?: string[]
}

export interface CompileAndFixResult extends AbstractResult {
  tscFinalCommand: string
  postProcessResults?: (FixAmdTslibResult & { fileName: string })[]
}


export const forceTsConfig: { [name: string]: string | boolean } = {
  module: "commonjs",
  noEmitHelpers: true,
  importHelpers: true,
  listEmittedFiles: true,
  sourceMap: false // since we modify the output sourcemaps get invalid
}

export function compileAndFix(config: CompileAndFixConfig): CompileAndFixResult {
  const { emittedFileNames, tscFinalCommand } = compileTsProject(config)
  let error = false
  const filesWithErrors = []
  const postProcessResults = emittedFileNames
    .map(fileName => {
      const result = fixJsFileAmdTslib({
        inputCode: readFileSync(fileName).toString()
      })
      if (error || config.breakOnFirstError && result.errors.length) {
        error = true
        filesWithErrors.push(fileName)
        return undefined
      }
      // const output=config.eslintFix ? eslintFix(fileName)
      writeFileSync(fileName, result.outputCode)
      return { ...result, fileName }
    })
    .filter(r => !!r)
  addTslibAmd(config)
  return {
    errors: error ? [`There were errors processing ${filesWithErrors.length} files, see postProcessResults`] : [], tscFinalCommand,
    emittedFilePaths: emittedFileNames,
    postProcessResults
  }
}

// function eslintFix(fileName:string) {
//     if
//  //TODO
//  return f
// }

//TODO watcher