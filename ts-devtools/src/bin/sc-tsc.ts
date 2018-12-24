import minimist from 'minimist'
import { AllConfig, import2defineCompileAndFix } from '../util/import2defineCompileAndFix';

export function main() {
  const args = minimist((process.argv.slice(2)))
  const config: AllConfig = args as any
  if (config.debug) {
    console.log(`Config: 
${JSON.stringify(config, null, 2)}
`);

  }
  if (!checkRequiredParams(config)) {
    exit('Invalid call, insufficient arguments. ', 1, true)
  }
  const result = import2defineCompileAndFix(config)
  if (config.debug) {
    console.log(`Results: 
${JSON.stringify({
      ...result,
      // tscFinalCommand: result.tscFinalCommand, tslibFinalDest: result.tslibFinalDest, emittedFilePaths: result.emittedFilePaths, errors: result.errors, 
      perFileResults: (result.perFileResults || []).map(r => ({
        ...r,
        sourceFile: r.sourceFile && r.sourceFile.getFilePath(), imports: r.imports.map(i => ({
          ...i,
          importSpecifierSourceFile: i.importSpecifierSourceFile&&i.importSpecifierSourceFile.getFilePath()
        }))
      })),
    })
      // postProcessResults: (result.postProcessResults||[]).map(r=>({...r, r: r.}))
      }, null, 2)}
`);

  }
  if (result.errors.length) {
    exit(`There where errors: 
${result.errors.map(e => e).join('\n')}`, 1)
  }
  else {
    exit(`Sucessfully generated JS project "${config.outputFolder}"`, 0)
  }
}

function checkRequiredParams(config: AllConfig) {
  return config.tsconfigFilePath && config.outputFolder
}

function exit(msg: string, code: number = 0, showHelp = false) {
  const log = code === 0 ? console.log : console.error
  log(msg);
  if (showHelp) {
    console.log(help());
  }
  process.exit(code)
}

function help() {
  return `
Usage: sc-tsc --tsconfigFilePath my/ts/project/tsconfig.json --outputFolder my/compiled/project

  `
}
