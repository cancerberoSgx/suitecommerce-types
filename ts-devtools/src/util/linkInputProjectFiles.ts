import { dirname, resolve } from "path"
import { mkdir, ln, ls, test } from "shelljs"
import { AbstractConfig } from "../compileAndFix/compileAndFix"

/** Called by import2define() to complete the output project setup. Will create links in `config.outputFolder` like node_modules so they point to `config.tsconfigFilePath`'s folder
 * 
 * 
 * TODO: review this since it can cause problems. Ideally we want to create a new project with the right configuration or even work in an existing ts project. in later case we should check if configuration is supported. 
*/
export function linkInputProjectFiles(config: AbstractConfig) {
  const tsConfigFolder = dirname(resolve(config.tsconfigFilePath))
  if (!config.skipLinkInputProjectFiles) {
    ln('-sf', `${tsConfigFolder}/node_modules`, `${config.outputFolder}/node_modules`)
    ls('-R', tsConfigFolder)
      .filter(f => !f.startsWith('node_modules') && !test('-e', `${config.outputFolder}/${f}`))
      .forEach(f => {
        mkdir('-p', `${config.outputFolder}/${dirname(f)}`)
        if(!test('-e', `${config.outputFolder}/${f}`)){
          ln('-sf', `${tsConfigFolder}/${f}`, `${config.outputFolder}/${f}`)
        }
      })
  }
}
