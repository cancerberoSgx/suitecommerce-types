import { CompileAndFixConfig } from "./compileAndFix";
import { relative, isAbsolute, resolve, join } from "path";
import { cp, mkdir } from "shelljs";

/**
 * @param config 
 * @returns the final path where tslib.js was added in the output
 */
export function addTslibAmd(config: CompileAndFixConfig): string | undefined {
  if (!config.addTslibJsInFolder) {
    return
  }
  const finalDest = isAbsolute(config.addTslibJsInFolder) ? config.addTslibJsInFolder : resolve(relative(config.tsconfigFilePath, config.addTslibJsInFolder))
  mkdir('-p', finalDest)
  const tslibJsPath = resolve(join(__dirname, '..', '..', 'node_modules/tslib/tslib.js'))
  cp(tslibJsPath, finalDest)
  return finalDest
}