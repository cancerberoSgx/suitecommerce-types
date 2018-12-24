import { dirname, join, resolve } from "path";
import { cp, mkdir } from "shelljs";
import { ImportDeclaration, Project, QuoteKind } from "ts-simple-ast";
import { AbstractConfig, AbstractResult } from "../compileAndFix/compileAndFix";
import { export2defineOne, Export2DefineOneResult, printExport2DefineOneResult } from "./export2defineOne";
import { linkInputProjectFiles } from "../util/linkInputProjectFiles";

export interface Export2DefineConfig extends AbstractConfig {
  customImportSpecifiers?: CustomImportSpecifier[]
  ignoreImportSpecifiers?: IgnoreImportSpecifier[]
}

export interface IgnoreImportSpecifier {
  predicate: (id: ImportDeclaration) => boolean
}

export interface CustomImportSpecifier {
  predicate: (id: ImportDeclaration, ni: string) => boolean,
  getImportSpecifier: (id: ImportDeclaration, ni: string) => string
}

export interface Export2DefineResult extends AbstractResult {
  perFileResults: Export2DefineOneResult[]
}

export function export2define(config: Export2DefineConfig): Export2DefineResult {
  const project = new Project({
    tsConfigFilePath: config.tsconfigFilePath,
    addFilesFromTsConfig: true,
  })
  const result = export2defineProject({ project, tsconfigFilePath: config.tsconfigFilePath })

  const tsConfigFolder = dirname(resolve(config.tsconfigFilePath))
  if (config.outputFolder) {
    mkdir('-p', config.outputFolder)
    cp(config.tsconfigFilePath, config.outputFolder)
    const project2 = new Project({
      tsConfigFilePath: config.tsconfigFilePath,
      addFilesFromTsConfig: false,
    })
    result.perFileResults.forEach(r => {
      const p = resolve(r.sourceFile.getFilePath())
      const name = join(config.outputFolder, p.substring(tsConfigFolder.length + 1, p.length))
      const file = project2.createSourceFile(name, printExport2DefineOneResult(r), { overwrite: true })
      file.saveSync()
    })
    project2.saveSync()

    linkInputProjectFiles(config)
  }

  return result
}

export function export2defineProject(config: Export2DefineConfig & { project: Project }): Export2DefineResult {
  const result: Export2DefineResult = {
    errors: [],
    perFileResults: []
  }
  result.perFileResults = config.project.getSourceFiles()

    .filter(f => {
      return !f.isFromExternalLibrary() && !f.isDeclarationFile() && !f.isInNodeModules()
    })

    .map(sourceFile => {
      const r = result.errors.length ? undefined : export2defineOne(config, sourceFile, result)
      //TODO support config.breakOnFirstError
      return r
    })

    .filter(r => !!r)

    // now that we have import informatoin for all files we fix imports to relative files to point to the export name
    .map((r, i, arr) => {
      r.imports = r.imports.map(im => {
        if (im.moduleSpecifier.startsWith('.') && im.importSpecifierSourceFile) {
          //TODO: error if !im.importSpecifierSourceFile
          const importSpecifierResult = arr.find(rr => rr.sourceFile === im.importSpecifierSourceFile)
          //TODO error if !importSpecifierResult
          im.moduleSpecifier = importSpecifierResult.exportName
        }
        return im
      })
      return r
    })
  return result
}


