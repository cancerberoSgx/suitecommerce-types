import { dirname, resolve } from "path";
import { cd, config as shellconfig, exec, mkdir, pwd, rm, test } from "shelljs";
import { AbstractConfig, AbstractResult, CompileAndFixResult } from "../compileAndFix/compileAndFix";


export const forceTsConfig: { [name: string]: string | boolean } = {
  module: "commonjs",
  noEmitHelpers: true,
  importHelpers: true,
  listEmittedFiles: true,
  sourceMap: false, // since we modify the output sourcemaps get invalid
  skipLibCheck: true
}

export function compileTsProject(config: AbstractConfig): CompileAndFixResult {
  shellconfig.silent = !config.debug
  const outputFolder = config.outputFolder ? resolve(config.outputFolder) : false;
  if (outputFolder) {
    if (config.cleanOutputFolder && !config.debug) {
      rm('-rf', outputFolder);
      mkdir('-p', outputFolder);
    }
  }
  if(!test('-f', config.tsconfigFilePath)){
    return {errors: [`tsconfig.json file doesnt exist: ${config.tsconfigFilePath}`], tscFinalCommand: ''}
  }
  const cwd = pwd();
  const tsConfigFolder =dirname(config.tsconfigFilePath)
  cd(tsConfigFolder);
  const tscFinalCommand = `npx tsc ${outputFolder ? `--outDir '${outputFolder}'` : ``} ${
    Object.keys(forceTsConfig)
    .filter(name => !!forceTsConfig[name])
    .map(name => `--${name} ${forceTsConfig[name] === true ? '' : forceTsConfig[name]}`)
    .join(' ')
  }`;
  if(config.debug){
    console.log(`About to execute command ${tscFinalCommand}, current folder is : ${process.cwd()} and should be also this: ${tsConfigFolder}`);
  }
  const p = exec(tscFinalCommand);
  if (p.code !== 0) {
    cd(cwd);
    return { tscFinalCommand, errors: [`Executing command '${tscFinalCommand}' throwed error: stderr: ${p.stderr}`] };
  }
  const prefix = 'TSFILE: ';
  const emittedFileNames = p.stdout.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith(prefix) && l.endsWith('.js'))
    .map(l => l.substring(prefix.length, l.length))
    .filter(f => f.endsWith('.js'));
  cd(cwd);
  return { emittedFileNames, tscFinalCommand, errors: [] };
}
