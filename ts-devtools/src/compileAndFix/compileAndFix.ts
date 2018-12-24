import { readFileSync, writeFileSync } from "fs";
import { fixJsFileAmdTslib } from "../fixAmdTslib/fixJsFileAmdTslib";
import { FixAmdTslibResult } from "../fixAmdTslib/types";
import { compileTsProject } from "../util/compileTsProject";
import { addTslibAmd } from "./addTslibAmd";

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
  breakOnFirstError?: boolean

  /** if outputFolder is declared then all input project files like node_modules, package.json, etc need to be present in the new project for it work. Set this to true to not do it so. */
  skipLinkInputProjectFiles?: boolean;

  /**if true will run `npx eslint --fix` before writing the files using the target project cwd. 
   * Note that the target project needs to have support for eslint (all dependencies installed locally)
   * and have a tslintrc file available since the project will be defining indentation style.*/
  eslintFix?: boolean,

  debug?: boolean
}

export interface CompileAndFixConfig extends AbstractConfig {
  /** if set, it will add tslib.js (AMD module) in given path that must be relative to `tsconfigJsonPath`*/
  addTslibJsInFolder?: string
}

export interface AbstractResult {
  errors: string[]
  emittedFilePaths?: string[]
  tslibFinalDest?:string
}

export interface CompileAndFixResult extends AbstractResult {
  /** the final tsc command used to compile the project */
  tscFinalCommand: string
  emittedFileNames?: string[]
  postProcessResults?: (FixAmdTslibResult & { fileName: string })[]
}

/** 
 * given an input TS project using define() (not import/export) will 
 * will run tsc with approrpiate args (target) and then fixJsFileAmdTslib() and addTslibAmd() 
 * so the output JS project is AMD understandable by SC
 * 
 * Notice that input project can import only types (ie: sc-types-frontend)
 * */
export function compileAndFix(config: CompileAndFixConfig): CompileAndFixResult {
  const result = compileTsProject(config)
  if(result.errors.length){
    return 
  }
  let error = false
  const filesWithErrors = []
  let errors : string[]=[]
  const postProcessResults = result.emittedFileNames
    .map(fileName => {
      const result = fixJsFileAmdTslib({
        inputCode: readFileSync(fileName).toString()
      })
      errors=errors.concat(result.errors) 
      if (error || config.breakOnFirstError && result.errors.length) {
        error = true
        filesWithErrors.push(fileName)
        return undefined
      }
      writeFileSync(fileName, result.outputCode)
      return { ...result, fileName }
    })
    .filter(r => !!r)
  const tslibFinalDest = addTslibAmd(config)
  return {
    errors: errors.concat( error ?[`There were errors processing ${filesWithErrors.length} files, see postProcessResults`] : []), 
    tscFinalCommand: result.tscFinalCommand,
    emittedFilePaths: result.emittedFileNames,
    postProcessResults, tslibFinalDest
  }
}
