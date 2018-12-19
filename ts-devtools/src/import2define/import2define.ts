import { dirname, join, resolve } from 'path'
import { config as shellConfig, cp, mkdir } from 'shelljs'
import { fixSourceFileErrors } from 'ts-fix-all-errors'
import { ImportDeclaration, Project } from 'ts-simple-ast'
import { AbstractConfig, AbstractResult } from '../compileAndFix/compileAndFix'
import { linkInputProjectFiles } from '../util/linkInputProjectFiles'
import { import2defineOne, Import2DefineOneResult, _import2defineOneReset } from './import2defineOne'
import { _namedImportReferenceIsTypeReset } from "./namedImportReferenceIsType";
import { import2DefineOnePrintResult } from './import2DefineOnePrintResult'
import { _getDefaultExportValueReset } from './getDefaultExportValue';

export interface Import2DefineConfig extends AbstractConfig {
  customImportSpecifiers?: CustomImportSpecifier[]
  ignoreImportSpecifiers?: IgnoreImportSpecifier[]
  /** 
   * If specified all dependency names will be prefixed with it. 
   * This way, one can make sure AMD dependency names don't collide with other modules so it's possible to use 
   * simple file names like `Manager.ts`. 
   */
  dependencyPrefix?: string
}

export interface IgnoreImportSpecifier {
  predicate: (id: ImportDeclaration) => boolean
}

export interface CustomImportSpecifier {
  predicate: (id: ImportDeclaration, ni: string) => boolean,
  /** if undefined the specifier will be ignored */
  getImportSpecifier: (id: ImportDeclaration, ni: string) => string | undefined
}

export interface Import2DefineResult extends AbstractResult {
  perFileResults: Import2DefineOneResult[]
}

/**
 * Will load given TS project, parse it and generate another equivalent project at `config.outputFolder`
 * transforming import/exports to AMD define() declarations compatible with SC. Then it willtry to make sure
 * output TS project don't have compile errors and last it will make sure output project npm install and 
 * tsconfig are set up so it's read to be compiled with tsc
 */
export function import2define(config: Import2DefineConfig): Import2DefineResult {
  const tsOutputFolder = config.outputFolder//config.outputTsTmpProjectFolder || config.outputFolder
  shellConfig.silent = !config.debug
  const project = new Project({
    tsConfigFilePath: config.tsconfigFilePath,
    // compilerOptions: { jsx: JsxEmit.React },
    addFilesFromTsConfig: true,
  })
  const tsConfigFolder = dirname(resolve(config.tsconfigFilePath))
  const result = import2defineProject({ ...config, project, tsconfigFilePath: config.tsconfigFilePath })
  if (!result.errors.length && tsOutputFolder) {
    mkdir('-p', tsOutputFolder)
    cp(config.tsconfigFilePath, tsOutputFolder)
    const project2 = new Project({
      tsConfigFilePath: config.tsconfigFilePath,
      // compilerOptions: { jsx: JsxEmit.React },
      addFilesFromTsConfig: false,
    })
    result.perFileResults.forEach(r => {
      const p = resolve(r.sourceFile.getFilePath())
      const name = join(tsOutputFolder, p.substring(tsConfigFolder.length + 1, p.length))
      const file = project2.createSourceFile(name, import2DefineOnePrintResult(r), { overwrite: true })
      if (config.debug) {
        console.log('Fixing all TS errors of ' + file.getFilePath())
      }
      // Heads up: fixSourceFileErrors() implemented in separate project ts-fix-all-errors will add //@ts-ignore 
      // comments on lines with errors - heuristic way of making sure output TS project compilation won't fail
      fixSourceFileErrors(file)
      file.saveSync()
    })
    project2.saveSync()
    linkInputProjectFiles(config)
  }
  return result
}

export function _import2defineReset() {
  _import2defineOneReset()
}

export function import2defineProject(config: Import2DefineConfig & { project: Project }): Import2DefineResult {
  const result: Import2DefineResult = {
    errors: [],
    perFileResults: []
  }
  _import2defineReset()
  result.perFileResults =
    config.project.getSourceFiles()
      .filter(f =>
        !f.isFromExternalLibrary() && !f.isDeclarationFile() && !f.isInNodeModules()
      )
      .map(sourceFile =>
        // TODO support config.breakOnFirstError
        result.errors.length ? undefined : import2defineOne(config, sourceFile, result)
      )
      .filter(r => result.errors.length === 0 && r)
      // now that we have import information for all files we fix imports to relative files to point to the export name
      .map((r, i, arr) => {
        r.imports = r.imports.map(im => {
          if (im.moduleSpecifier.startsWith('.')) {
            if (!im.importSpecifierSourceFile) {
              // Heads up : fix issue when importing a .tsx file:
              const p = resolve(dirname(r.sourceFile.getFilePath()) + '/' + im.moduleSpecifier + '.tsx')
              if (config.project.getSourceFile(p)) {
                im.importSpecifierSourceFile = config.project.getSourceFile(p)
              }
            }
            if (!im.importSpecifierSourceFile) {
              const importSpecifierSourceFile = config.project.getSourceFile(
                resolve(dirname(r.sourceFile.getFilePath()) + '/' + im.moduleSpecifier + '.ts'))
              im.importSpecifierSourceFile = importSpecifierSourceFile || im.importSpecifierSourceFile
            }
            if (im.importSpecifierSourceFile) {
              // TODO: error if !im.importSpecifierSourceFile
              const importSpecifierResult = arr.find(rr => rr.sourceFile === im.importSpecifierSourceFile)
              // TODO error if !importSpecifierResult it means it was an error 
              im.moduleSpecifier = importSpecifierResult && importSpecifierResult.exportName
            }
          }
          if (!im.importSpecifierSourceFile && config.debug) {
            console.error('warning local file not found: ' + im.moduleSpecifier)
          }
          return im
        })
        return r
      })
  return result
}
