import { isAbsolute, join, resolve } from 'path'
import { config as shellConfig, cp, mkdir } from 'shelljs'
import { getNodeModulesFolderPath } from '../util/misc'
import { CompileAndFixConfig } from './compileAndFix'
import { appendFileSync } from 'fs';
import { suiteCommerceExtraModules } from '../import2define/import2defineDefaults';

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

  // Heads up : adding suiteCommerce extra modules like Backbone.Collection and Backbone.Router so when they are 
  // required by those names the correct object is returned
  const tslibDest = join(finalDest, 'tslib.js')
  suiteCommerceExtraModules.forEach(extraModule => {
    appendFileSync(tslibDest, `\n${extraModule.text}\n`)
    if (config.debug) {
      console.log(`appended suiteCommerceExtraModule '${extraModule.name}' to '${tslibDest}'`)
    }
  })

  return finalDest
}