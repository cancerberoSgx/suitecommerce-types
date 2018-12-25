import { dirname, resolve } from "path";
import { config as shellconfig, rm } from "shelljs";
import { compileAndFix, CompileAndFixConfig, CompileAndFixResult } from "../compileAndFix/compileAndFix";
import { import2define, Import2DefineConfig, Import2DefineResult } from "../import2define/import2define";

export interface AllConfig extends CompileAndFixConfig, Import2DefineConfig {
  outputFolder: string
}

export interface AllResult extends CompileAndFixResult, Import2DefineResult {

}

/** will execute import2define() first using a tmp project folder and then compileAndFix() over that one 
 * to generate a valid JS AMD project that SC understand */
export function import2defineCompileAndFix(config: AllConfig): AllResult {
  config.tsconfigFilePath=resolve(config.tsconfigFilePath)
  config.outputFolder=config.outputFolder?resolve(config.outputFolder) : config.outputFolder
  shellconfig.silent = !config.debug
  let inputFolder = dirname(resolve(config.tsconfigFilePath));
  let outputFolder = `${config.outputFolder}_ts`, outputFolderFirst = outputFolder

  !config.debug && rm('-rf', outputFolder)

  const import2defineResult = import2define({
    ...config,
    outputFolder
  })
  if (import2defineResult.errors.length) {
    !config.debug && rm('-rf', outputFolder)
    return { ...import2defineResult, tscFinalCommand: '' }
  }

  inputFolder = outputFolder
  outputFolder = config.outputFolder
  if (config.cleanOutputFolder&& !config.debug) {
    rm('-rf', config.outputFolder)
  }
  const result = compileAndFix({
    ...config,
    tsconfigFilePath: `${inputFolder}/tsconfig.json`,
    breakOnFirstError: true,
    addTslibJsInFolder: `src`
  })

  !config.debug && rm('-rf', outputFolderFirst)
  return { ...import2defineResult, ...result }
}