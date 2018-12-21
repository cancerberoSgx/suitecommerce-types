
const args = require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string }

// import { ls, test, rm } from 'shelljs';
// ls('.').filter(f=>test('-L', f)).forEach(f=>{
//   rm('-rf', f)
//   console.log(f);
// })
// process.exit(0)

// heads up ! we need to link puppeteer dependency before loading any of our modules (that could require non existing puppeteer dependency) : 
if (args.puppeteerNodeModulesPath) {
  const path = require('path')
  // @ts-ignore
  const linkDependenciesFn = require('../installation').linkDependencies as typeof linkDependencies

  // find current node_modules (this project): 
  const inDist = path.join(__dirname, '..').endsWith(`dist${path.sep}src`)
  const result = path.join(__dirname, '..', '..', inDist ? '..' : '' , 'node_modules')
  const thisProject =  path.resolve(result)
  const targetProject = path.join(args.puppeteerNodeModulesPath, 'node_modules')
  args.debug && console.log(`Linking Puppeteer dependencies from ${targetProject} to ${thisProject}`)

  linkDependenciesFn(targetProject, thisProject)
}



import { execUnitTest, ScaUnitTestConfig } from '../scaUnitTest';
import { linkDependencies } from '../installation';

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