import { dirname, resolve } from "path";
import { config as shellConfig, rm } from "shelljs";
import { compileAndFix, CompileAndFixConfig, CompileAndFixResult } from "../compileAndFix/compileAndFix";
import { import2define, Import2DefineConfig, Import2DefineResult } from "../import2define/import2define";
import { startWatch, WatchEvent } from "./startWatch";

export interface AllConfig extends CompileAndFixConfig, Import2DefineConfig {
  outputFolder: string
  /** destination for intermediate generated TS project */
  tsOutputFolder?: string
  /** watch mode will recompile changed files only */
  watch?: boolean,
  watchListener?: (event: WatchEvent)=>true|void
}

export interface AllResult extends CompileAndFixResult, Import2DefineResult {

}

/** will execute import2define() first using a tmp project folder and then compileAndFix() over that one 
 * to generate a valid JS AMD project that SC understand */
export function import2defineCompileAndFix(config: AllConfig): AllResult {
  config.tsconfigFilePath = resolve(config.tsconfigFilePath)
  config.outputFolder = config.outputFolder ? resolve(config.outputFolder) : config.outputFolder
  shellConfig.silent = !config.debug
  let inputFolder = dirname(resolve(config.tsconfigFilePath));
  let outputFolder = config.tsOutputFolder || `${config.outputFolder}_ts`
  const outputFolderFirst = outputFolder

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
  if (config.cleanOutputFolder && !config.debug) {
    rm('-rf', config.outputFolder)
  }

  const result = compileAndFix({
    ...config,
    tsconfigFilePath: `${inputFolder}/tsconfig.json`,
    breakOnFirstError: true,
    addTslibJsInFolder: config.addTslibJsInFolder && `src`
  })

  if (!config.debug && !config.watch) {
    rm('-rf', outputFolderFirst)
  }

  startWatch({
    ...config,
    filesToWatch: import2defineResult.perFileResults.map(r => r.sourceFile.getFilePath())
  })

  return { ...import2defineResult, ...result }
}

