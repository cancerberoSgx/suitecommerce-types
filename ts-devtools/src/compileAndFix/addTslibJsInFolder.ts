import { isAbsolute, join, resolve } from 'path'
import { config as shellConfig, cp, mkdir } from 'shelljs'
import { getNodeModulesFolderPath } from '../util/misc'
import { CompileAndFixConfig } from './compileAndFix'

/**
 * @returns the final path where tslib.js was added in the output
 */
export function addTslibJsInFolder(config: CompileAndFixConfig): string | undefined {
  shellConfig.silent = !config.debug
  if (!config.addTslibJsInFolder) {
    return
  }
  const finalDest = isAbsolute(config.addTslibJsInFolder) ? config.addTslibJsInFolder : resolve(join(config.outputFolder, config.addTslibJsInFolder))
  mkdir('-p', finalDest)
  const tslibJsPath = resolve(join(getNodeModulesFolderPath(), 'tslib', 'tslib.js'))
  if (config.debug) {
    console.log(`--addTslibJsInFolder - copying from '${tslibJsPath}' to '${finalDest}'`)
  }
  cp(tslibJsPath, finalDest)
  return finalDest
}