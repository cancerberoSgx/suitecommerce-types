import minimist from 'minimist'
import { AllConfig, import2defineCompileAndFix } from '../util/import2defineCompileAndFix';
import { help } from './help';

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
      perFileResults: (result.perFileResults || []).map(r => ({
        ...r,
        body: ministr(r.body),
        exportValue: ministr(r.exportValue),
        statementOutsideHandler: ministr(r.statementOutsideHandler),
        sourceFile: r.sourceFile && r.sourceFile.getFilePath(),
        imports: (r.imports||[]).map(i => ({
          ...i,
          importSpecifierSourceFile: i.importSpecifierSourceFile && i.importSpecifierSourceFile.getFilePath()
        }))
      })),
      postProcessResults: (result.postProcessResults||[]).map(pr => ({
        ...pr,
        outputCode: ministr(pr.outputCode)
      })),
    }, null, 2)
      }
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

function ministr(s: string): string {
  return typeof s === 'undefined' ? 'undefined' : `string(${s.length})`
}

function exit(msg: string, code: number = 0, showHelp = false) {
  const log = code === 0 ? console.log.bind(console) : console.error.bind(console)
  log(msg);
  if (showHelp) {
    console.log(getHelp());
  }
  process.exit(code)
}

function getHelp() {
  return `
Usage: sc-tsc --tsconfigFilePath my/ts/project/tsconfig.json --outputFolder my/compiled/project
Options: 
${help}
  `.trim()
}
