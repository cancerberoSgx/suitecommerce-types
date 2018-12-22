import { dirname, resolve, join } from "path"
import { cd, config as shellconfig, exec, mkdir, pwd, rm, test, ls } from "shelljs"
import { AbstractConfig, AbstractResult, CompileAndFixResult, CompileAndFixConfig } from "../compileAndFix/compileAndFix"
import Project from "ts-simple-ast";
import { fixProjectErrors } from "ts-fix-all-errors";
import { time, timeEnd } from "./timeLog";


export const forceTsConfig: { [name: string]: string | boolean } = {
  module: "commonjs",
  noEmitHelpers: true,
  importHelpers: true,
  strictNullChecks: false,
  strict: false,
  noImplicitAny: false,
  listEmittedFiles: true, 
  sourceMap: false, // since we modify the output sourcemaps get invalid
  skipLibCheck: true,
  skipDefaultLibCheck: true,
}

export function compileTsProject(config: CompileAndFixConfig): CompileAndFixResult {


  time('compileTsProject')

 
  


  shellconfig.silent = !config.debug
  const outputFolder = resolve(config.outputFolder)//config.outputFolder ? resolve(config.outputFolder) : false
  // if (outputFolder) {
    if (config.cleanOutputFolder && !config.debug) {
      rm('-rf', outputFolder)
      mkdir('-p', outputFolder)
    }
  // }
  if(!test('-f', config.tsconfigFilePath)){
    timeEnd('compileTsProject')
    return {errors: [`tsconfig.json file doesn't exist: ${config.tsconfigFilePath}`], tscFinalCommand: ''}
  }
  const cwd = pwd()
  const tsConfigFolder =dirname(config.tsconfigFilePath)



  const tscFinalCommand = `npx tsc ${outputFolder ? `--outDir '${outputFolder}'` : ``} ${
    Object.keys(forceTsConfig)
    .filter(name => !!forceTsConfig[name])
    .map(name => `--${name} ${(forceTsConfig[name] === true) ? '' : forceTsConfig[name]}`)
    .join(' ')
  }`
  let emittedFileNames: string[]

  // if(config.project){
  //   config.project.compilerOptions.set({...config.project.compilerOptions.get(), ...forceTsConfig, outDir: outputFolder})
  //   config.project.emit()
  //   emittedFileNames = ls('-R', outputFolder).filter(f=>f.endsWith('.js')).map(f=>resolve(join(outputFolder, f)))
  //   timeEnd('compileTsProject')
  //   return {
  //     emittedFileNames, 
  //     errors: [],
  //     tscFinalCommand
  //   }
  // }



  cd(tsConfigFolder)
  if(config.debug){
    console.log(`About to execute command ${tscFinalCommand}, current folder is : ${process.cwd()} and should be also this: ${tsConfigFolder}`)
  }
  const p = exec(tscFinalCommand)
  if (p.code !== 0) {
    cd(cwd)
    timeEnd('compileTsProject')
    return { 
      tscFinalCommand, 
      errors: [`Executing command '${tscFinalCommand}' thrown error! \nstderr: ${p.stderr}\nstdout: ${p.stdout}`] 
    }
  }
  const prefix = 'TSFILE: '
  emittedFileNames = p.stdout.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith(prefix) && l.endsWith('.js'))
    .map(l => l.substring(prefix.length, l.length))
    .filter(f => f.endsWith('.js'))
  cd(cwd)

  timeEnd('compileTsProject')
  return { 
    emittedFileNames, 
    tscFinalCommand, 
    errors: []
   }
}
