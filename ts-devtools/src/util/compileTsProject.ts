import { dirname, resolve } from "path";
import { cd, config, exec, mkdir, pwd, rm } from "shelljs";
import { AbstractConfig } from "../compileAndFix/compileAndFix";

config.silent = true

export const forceTsConfig: { [name: string]: string | boolean } = {
  module: "commonjs",
  noEmitHelpers: true,
  importHelpers: true,
  listEmittedFiles: true,
  sourceMap: false // since we modify the output sourcemaps get invalid
}

export function compileTsProject(config: AbstractConfig) {
  const outputFolder = config.outputFolder ? resolve(config.outputFolder) : false;
  if (outputFolder) {
    if (config.cleanOutputFolder) {
      rm('-rf', outputFolder);
    }
    mkdir('-p', outputFolder);
  }
  const cwd = pwd();
  cd(dirname(config.tsconfigFilePath));
  const tscFinalCommand = `npx tsc ${outputFolder ? `--outDir '${outputFolder}'` : ``} ${
    Object.keys(forceTsConfig)
    .filter(name => !!forceTsConfig[name])
    .map(name => `--${name} ${forceTsConfig[name] === true ? '' : forceTsConfig[name]}`)
    .join(' ')
  }`;
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
  return { emittedFileNames, tscFinalCommand };
}