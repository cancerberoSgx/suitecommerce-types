import { CompileAndFixConfig, CompileAndFixResult, compileAndFix } from "../compileAndFix/compileAndFix";
import { Export2DefineConfig, Export2DefineResult, export2define } from "../import2define/import2define";
import { dirname, resolve } from "path";
import { rm } from "shelljs";

export interface AllConfig extends CompileAndFixConfig, Export2DefineConfig {
  outputFolder: string
}

export interface AllResult extends CompileAndFixResult, Export2DefineResult {

}

/** will execute export2define() first using a tmp project folder and then compileAndFix() over that one to generate a valid JS AMD project that SC understand */
export function import2defineCompileAndFix(config: AllConfig): AllResult {
  let inputFolder = dirname(resolve(config.tsconfigFilePath));
  let outputFolder = `${config.outputFolder}_ts`, outputFolderFirst=outputFolder
  rm('-rf', outputFolder)
  const export2defineResult = export2define({
    ...config, 
    outputFolder
  })
  if (export2defineResult.errors.length) {
    rm('-rf', outputFolder)
    return { ...export2defineResult, tscFinalCommand: '' }
  }

  inputFolder = outputFolder
  outputFolder = config.outputFolder
  if(config.cleanOutputFolder){
    rm('-rf', config.outputFolder)
  }
  const result = compileAndFix({
    ...config,
    tsconfigFilePath: `${inputFolder}/tsconfig.json`,
    breakOnFirstError: true,
    addTslibJsInFolder: `${resolve(config.outputFolder)}/src`
  })
  
  rm('-rf', outputFolderFirst)
  return {...export2defineResult, ...result}
}