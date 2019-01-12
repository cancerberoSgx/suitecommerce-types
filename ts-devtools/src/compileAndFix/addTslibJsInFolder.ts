import { writeFileSync } from 'fs';
import { isAbsolute, join, resolve } from 'path';
import { config as shellConfig, cp, mkdir } from 'shelljs';
import { getSuiteCommerceExtraModules } from '../import2define/import2defineDefaults';
import { getNodeModulesFolderPath } from '../util/misc';
import { CompileAndFixConfig } from './compileAndFix';

/**
 * @returns the final path where tslib.js was added in the output
 */
export function addTslibJsInFolder(config: CompileAndFixConfig): string | undefined {
  shellConfig.silent = !config.debug
  if (!config.addTslibJsInFolder || typeof config.addTslibJsInFolder !== 'string') {
    if (config.debug) {
      console.log(`--addTslibJsInFolder - Not adding any file because config.addTslibJsInFolder===${config.addTslibJsInFolder} typeof config.addTslibJsInFolder === ${config.addTslibJsInFolder}`)
    }
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
  getSuiteCommerceExtraModules().forEach(extraModule => {
    const filePath = join(finalDest, extraModule.name)
    writeFileSync(filePath, `\n${extraModule.text}\n`)
    if (config.debug) {
      console.log(`appended suiteCommerceExtraModule '${extraModule.name}' to '${filePath}'`)
    }
  })
  return finalDest
}
