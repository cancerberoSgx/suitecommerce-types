import { Config } from ".";
import { fixSourceFileErrors } from "./fixSourceFileErrors";
import { fixProjectErrors } from "./fixProjectErrors";

export async function main() {

  const config = {
    ...require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string }
  } as any as Config

  if (config.help) {
    helpAndExit(0)
  }

  if(config.sourceFilePath){
    fixSourceFileErrors(config)
  }
  else if(config.tsConfigFilePath){
    fixProjectErrors(config)
  }
  else {
    console.error('Incorrect call, you must specify neither --tsConfigFilePath or --sourceFilePath');
    helpAndExit(1)
  }
}

function helpAndExit(code = 0) {
  console.log(`Usage examples: 
ts-fix-all-errors --sourceFilePath some/file.ts
ts-fix-all-errors --tsConfigFilePath some/project/tsconfig.json

Other arguments: --debug --help
` );

  process.exit(code)
}