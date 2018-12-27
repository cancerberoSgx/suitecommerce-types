import { dirname, join, resolve } from "path";
import { cp, mkdir, config as shellconfig, test } from "shelljs";
import { ImportDeclaration, Project, QuoteKind } from "ts-simple-ast";
import { AbstractConfig, AbstractResult } from "../compileAndFix/compileAndFix";
import { import2defineOne, Import2DefineOneResult, printImport2DefineOneResult } from "./import2defineOne";
import { linkInputProjectFiles } from "../util/linkInputProjectFiles";
import { JsxEmit } from "typescript";

export interface Import2DefineConfig extends AbstractConfig {
  customImportSpecifiers?: CustomImportSpecifier[]
  ignoreImportSpecifiers?: IgnoreImportSpecifier[]
}

export interface IgnoreImportSpecifier {
  predicate: (id: ImportDeclaration) => boolean
}

export interface CustomImportSpecifier {
  predicate: (id: ImportDeclaration, ni: string) => boolean,
  /** is undefined the specifier will be ignored */
  getImportSpecifier: (id: ImportDeclaration, ni: string) => string|undefined
}

export interface Import2DefineResult extends AbstractResult {
  perFileResults: Import2DefineOneResult[]
}

export function import2define(config: Import2DefineConfig): Import2DefineResult {
  shellconfig.silent = !config.debug
  const project = new Project({
    tsConfigFilePath: config.tsconfigFilePath,
    compilerOptions: {
      jsx: JsxEmit.React},
    addFilesFromTsConfig: true,
  })
  const tsConfigFolder = dirname(resolve(config.tsconfigFilePath))
  const result = import2defineProject({ project, tsconfigFilePath: config.tsconfigFilePath })
  if (!result.errors.length&&config.outputFolder) {
    mkdir('-p', config.outputFolder)
    cp(config.tsconfigFilePath, config.outputFolder)
    const project2 = new Project({
      tsConfigFilePath: config.tsconfigFilePath,
      compilerOptions: {
        jsx: JsxEmit.React},
      addFilesFromTsConfig: false,
    })
    result.perFileResults.forEach(r => {
      const p = resolve(r.sourceFile.getFilePath())
      const name = join(config.outputFolder, p.substring(tsConfigFolder.length + 1, p.length))
      const file = project2.createSourceFile(name, printImport2DefineOneResult(r), { overwrite: true })
      file.saveSync()
    })
    project2.saveSync()

    linkInputProjectFiles(config)
  }

  return result
}

export function import2defineProject(config: Import2DefineConfig & { project: Project }): Import2DefineResult {
  const result: Import2DefineResult = {
    errors: [],
    perFileResults: []
  }
  result.perFileResults = config.project.getSourceFiles()

    .filter(f => {
      return !f.isFromExternalLibrary() && !f.isDeclarationFile() && !f.isInNodeModules()
    })

    .map(sourceFile => {
      const r = result.errors.length ? undefined : import2defineOne(config, sourceFile, result)
      //TODO support config.breakOnFirstError
      return r
    })

    .filter(r => result.errors.length===0&&r)

    // now that we have import information for all files we fix imports to relative files to point to the export name
    .map((r, i, arr) => {
      r.imports = r.imports.map(im => {
        if (im.moduleSpecifier.startsWith('.')) {
          if(!im.importSpecifierSourceFile){
            //issue when importing a .tsx file
            const p = resolve(dirname(r.sourceFile.getFilePath())+'/'+im.moduleSpecifier+'.tsx')
            // if(test('-f', p)){
              if(config.project.getSourceFile(p)){
               im.importSpecifierSourceFile= config.project.getSourceFile(p)
            }
          }
          
          if(!im.importSpecifierSourceFile){
            const p = resolve(dirname(r.sourceFile.getFilePath())+'/'+im.moduleSpecifier+'.ts')
            // if(test('-f', p)){
              if(config.project.getSourceFile(p)){
               im.importSpecifierSourceFile= config.project.getSourceFile(p)
            }
          }
          if(im.importSpecifierSourceFile){
            //TODO: error if !im.importSpecifierSourceFile
            const importSpecifierResult = arr.find(rr => rr.sourceFile === im.importSpecifierSourceFile)
            //TODO error if !importSpecifierResult it means it was an error 
            im.moduleSpecifier = importSpecifierResult && importSpecifierResult.exportName
          }
         
        }
        return im
      })
      return r
    })
  return result
}



