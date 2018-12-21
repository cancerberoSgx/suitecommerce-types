

import { execUnitTest, ScaUnitTestConfig } from '../scaUnitTest';

const args = require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string }

export async function main() {

  if (!args.path || !args.modules) {
    console.error('\nINCORRECT CALL: --path and --modules arguments are mandatory\n')
    helpAndExit(1)
  }
  const config = {
    ...args,
    modules: args.modules.split(',')
  } as ScaUnitTestConfig

  if (args.help) {
    helpAndExit(0)
  }

  const result = await execUnitTest(config)
  console.log(`${result.failed ? 'FAILED!' : 'PASSED'}\n${result.barMessage}`);
  process.exit(result.failed ? 1 : 0)
}

function helpAndExit(code = 0) {
  console.log(`Usage: 
sca-unit-test --path ../dev/kilimanjaro --modules MyCoolModule,AnotherOneSeparatedWithComma

Other arguments: --debug --screenshot --consoleLo
` );

  process.exit(code)
}