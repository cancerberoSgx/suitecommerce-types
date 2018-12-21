

import { GetJasmineHtmlResultsConfig, waitForJasmine, getJasmineHtmlResults } from '../jasmineHtml';

const args = require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string }

export async function main() {

  if (!args.url) {
    console.error('\nINCORRECT CALL: --url argument are mandatory\n')
    helpAndExit(1)
  }
  const config = args as any as GetJasmineHtmlResultsConfig

  if (args.help) {
    helpAndExit(0)
  }
  const result = await getJasmineHtmlResults(config)
  console.log(`${result.failed ? 'FAILED!' : 'PASSED'}\n${result.barMessage}`);
  process.exit(result.failed ? 1 : 0)
}

function helpAndExit(code = 0) {
  console.log(`Usage: 
jasmine-puppeteer-results TODO

Other arguments: --debug --screenshot --consoleLog
` );

  process.exit(code)
}