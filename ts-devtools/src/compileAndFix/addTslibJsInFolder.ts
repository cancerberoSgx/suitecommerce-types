import { isAbsolute, join, resolve, dirname } from 'path'
import { config as shellConfig, cp, mkdir } from 'shelljs'
import { getNodeModulesFolderPath } from '../util/misc'
import { CompileAndFixConfig } from './compileAndFix'
import { appendFileSync, readFileSync } from 'fs';
import { suiteCommerceExtraModules } from '../import2define/import2defineDefaults';
import {parseJSONFile} from 'misc-utils-of-mine'

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
  const tslibDest = join(finalDest, 'tslib.js');
  [].concat(suiteCommerceExtraModules).concat(getExtraModules(config)).forEach(extraModule => {
    appendFileSync(tslibDest, `\n${extraModule.text}\n`)
    if (config.debug) {
      console.log(`appended suiteCommerceExtraModule '${extraModule.name}' to '${tslibDest}'`)
    }
  })
  return finalDest
}

function getExtraModules(config: CompileAndFixConfig): {name: string, text: string}[] {
  // const a: {name: string, text: string}[] = []
  // const package = readFileSync(join(dirname(config.tsconfigFilePath), 'package.json')).toString()
  const packageJson = parseJSONFile(join(dirname(config.tsconfigFilePath), 'package.json'))
  if(packageJson && (Object.keys(packageJson.devDependencies).includes('sc-types-frontend-extras') || Object.keys(packageJson.dependencies).includes('sc-types-frontend-extras'))) {
    const base = join(dirname(config.tsconfigFilePath), 'node_modules', 'sc-types-frontend-extras', 'compiled', 'src', 'jsx')
    const names = ['JSXView.js',  'ReactLike.js']
    return names.map(name=>({name, text: readFileSync(join(base, name)).toString()}))
  }
  return []
  // return a
}