import { CompileAndFixConfig } from "./compileAndFix";
import { relative, isAbsolute, resolve, join, dirname } from "path";
import { cp, mkdir, config as shellconfig } from "shelljs";
import { getNodeModulesFolderPath } from "../util/misc";

/**
 * @returns the final path where tslib.js was added in the output
 */
export function addTslibAmd(config: CompileAndFixConfig): string | undefined {
  shellconfig.silent = !config.debug
  if (!config.addTslibJsInFolder) {
    return
  }
  const finalDest = isAbsolute(config.addTslibJsInFolder) ? config.addTslibJsInFolder : resolve(join(config.outputFolder, config.addTslibJsInFolder))
  mkdir('-p', finalDest)
  const tslibJsPath = resolve(join(getNodeModulesFolderPath(),  'tslib', 'tslib.js'))
  if(config.debug){
    console.log(`--addTslibJsInFolder - copying from "${tslibJsPath}" to "${finalDest}"`)
  }
  cp(tslibJsPath, finalDest)
  return finalDest
}