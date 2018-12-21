// import { ls, test, rm } from 'shelljs';
// ls('.').filter(f=>test('-L', f)).forEach(f=>{
//   rm('-rf', f)
//   console.log(f);
// })
// process.exit(0)

const args = require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string }


// heads up ! we need to link puppeteer dependency before loading any of our modules (that could require non existing puppeteer dependency) : 
if (args.puppeteerNodeModulesPath) {
  const path = require('path')
  // @ts-ignore
  const linkDependenciesFn = require('../installation').linkDependencies 

  // find current node_modules (this project): 
  const inDist = path.join(__dirname, '..').endsWith(`dist${path.sep}src`)
  const result = path.join(__dirname, '..', '..', inDist ? '..' : '' , 'node_modules')
  const thisProject =  path.resolve(result)
  const targetProject = path.join(args.puppeteerNodeModulesPath, 'node_modules')
  args.debug && console.log(`Linking Puppeteer dependencies from ${targetProject} to ${thisProject}`)
// process.exit(0)

  linkDependenciesFn(targetProject, thisProject)
}
// import { linkDependencies } from '../installation';

require('./cli').main()