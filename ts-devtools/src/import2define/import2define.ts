import { ImportDeclaration, ImportSpecifier, Project, SourceFile, SyntaxKind, TypeGuards, getCompilerOptionsFromTsConfig, CompilerOptionsFromTsConfigResult, CompilerOptions } from "ts-simple-ast";
import { AbstractConfig, AbstractResult } from "../compileAndFix/compileAndFix";
import { mkdir, cp } from "shelljs";
import { join, dirname, resolve } from "path";

export interface Export2DefineConfig extends AbstractConfig {
  customImportSpecifiers?: CustomImportSpecifier[]
  ignoreImportSpecifiers?: IgnoreImportSpecifier[]
  // /** if defined it will write output .ts project at given location */
}
export interface IgnoreImportSpecifier {
  predicate: (id: ImportDeclaration) => boolean
}
export interface CustomImportSpecifier {
  predicate: (id: ImportDeclaration, ni: string) => boolean,
  getImportSpecifier: (id: ImportDeclaration, ni: string) => string
}
export interface Export2DefineResult extends AbstractResult {
  perFileResults: Export2DefineSingleFileResult[]
}

export function export2define(config: Export2DefineConfig): Export2DefineResult {
  const project = new Project({
    tsConfigFilePath: config.tsconfigFilePath,
    addFilesFromTsConfig: true,
  })

  const result = export2defineProject({ project, tsconfigFilePath: config.tsconfigFilePath })

  if (config.outputFolder) {
    mkdir('-p', config.outputFolder)
    cp(config.tsconfigFilePath, config.outputFolder)
    const tsConfigFolder = dirname(resolve(config.tsconfigFilePath))
    const { options, errors } = getCompilerOptionsFromTsConfig(config.tsconfigFilePath)
    const project2 = new Project(
      {
        tsConfigFilePath: config.tsconfigFilePath,
        addFilesFromTsConfig: false
      }
    )
    result.perFileResults.forEach(r => {
      const p = resolve(r.sourceFile.getFilePath())
      const name = join(config.outputFolder, p.substring(tsConfigFolder.length + 1, p.length))
      const file = project2.createSourceFile(name, printExport2DefineFileResult(r))
      file.saveSync()
    })
    project2.saveSync()
  }

  return result
}

export function export2defineProject(config: Export2DefineConfig & { project: Project }): Export2DefineResult {
  const result: Export2DefineResult = {
    errors: [],
    perFileResults: []
  }
  result.perFileResults = config.project.getSourceFiles()

    .filter(f => !f.isFromExternalLibrary() && !f.isDeclarationFile() && !f.isInNodeModules())

    .map(sourceFile => {
      const r = result.errors.length ? undefined : export2defineSingleFile(config, sourceFile, result)
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

export interface Export2DefineSingleFileResult {
  sourceFile: SourceFile
  exportName: string
  imports: Export2DefineSingleFileResultImport[]
  exportValue: string
  body: string
  statementOutsideHandler: string
  importsToIgnore: string[]
}

export interface Export2DefineSingleFileResultImport {
  name: string
  moduleSpecifier: string
  importSpecifierSourceFile: SourceFile | undefined
}

export const defaultCustomImportSpecifiers: CustomImportSpecifier[] = [
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'suitecommerce',
    getImportSpecifier: (id: ImportDeclaration, ni: string) => ni
  },
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText().endsWith('.tpl'),
    getImportSpecifier: (id: ImportDeclaration, ni: string) => {
      const name = id.getModuleSpecifier().getLiteralText()
      return name.substring(name.lastIndexOf('/') + 1, name.length)
    }
  }
]

export const defaultIgnoreImportSpecifiers = [
  {
    predicate: (id: ImportDeclaration) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend'
  }
]

export function export2defineSingleFile(config: Export2DefineConfig, sourceFile: SourceFile, result: Export2DefineResult): Export2DefineSingleFileResult {
  config.customImportSpecifiers = (config.customImportSpecifiers && config.customImportSpecifiers.length) ? config.customImportSpecifiers : defaultCustomImportSpecifiers
  config.ignoreImportSpecifiers = (config.ignoreImportSpecifiers && config.ignoreImportSpecifiers.length) ? config.ignoreImportSpecifiers : defaultIgnoreImportSpecifiers

  const importDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration)
  const imports: Export2DefineSingleFileResultImport[] = []
  const importsToIgnore: string[] = []
  importDeclarations.forEach(id => {
    const moduleSpecifier = id.getModuleSpecifier().getLiteralText()
    if (config.ignoreImportSpecifiers.find(i => i.predicate(id))) {
      importsToIgnore.push(id.getText())
      id.remove()
      return
    }
    const clause = id.getImportClause()
    if (!clause) {
      result.errors = [...result.errors, 'not import clause found / not supported:' + id.getText()]
      return
    }
    const namedImports: string[] = clause.getNamedImports().length ? clause.getNamedImports().map(ni => ni.getName()) : [clause.getDefaultImport().getText()]
    if (!namedImports.length) {
      result.errors = [...result.errors, 'not named import found / not supported:' + id.getText()]
      return
    }
    namedImports.forEach(ni => {
      const customImportSpecifier = config.customImportSpecifiers.find(i => i.predicate(id, ni))
      const customImportSpecifierFn = customImportSpecifier ? customImportSpecifier.getImportSpecifier : ((id: ImportDeclaration, is: string) => moduleSpecifier)
      imports.push({
        name: ni,
        moduleSpecifier: customImportSpecifierFn(id, ni),
        importSpecifierSourceFile: (!id.getModuleSpecifierSourceFile()) ? undefined : id.getModuleSpecifierSourceFile()
      })
    })
    id.remove()
  })
  if (sourceFile.getDescendantsOfKind(SyntaxKind.ExportAssignment).length) {
    result.errors = [...result.errors, 'not supported export statement found> ' + sourceFile.getDescendantsOfKind(SyntaxKind.ExportAssignment)[0].getText()]
    return
  }
  const varStmts = sourceFile.getDescendantsOfKind(SyntaxKind.VariableStatement)
  const exportedVarStatements = varStmts.filter(vs => vs.getDescendantsOfKind(SyntaxKind.ExportKeyword).length)
  if (!exportedVarStatements.length) {
    result.errors = [...result.errors, 'no exported variable found in file ' + sourceFile.getFilePath()]
    return
  }
  if (exportedVarStatements.length > 1) {
    result.errors = [...result.errors, 'multiple variables exported not supported A: ' + exportedVarStatements.map(vs => vs.getText())]
    return
  }

  const exportStatement = exportedVarStatements[0]
  const exportedVar = exportStatement.getDescendantsOfKind(SyntaxKind.VariableDeclaration)[0]
  const exportedVariableDeclarations = exportedVar.findReferences()
    .map(r => r.getDefinition().getDeclarationNode())
    .filter(r => !!r && r.getKindName().endsWith('Declaration')) //TODO> do this better, perhaps negatively filtering importspecifier

  if (exportedVariableDeclarations.length !== 1) {
    result.errors = [...result.errors, 'exported variable declaration is not 1: ' + exportedVariableDeclarations.map(vs => vs.getKindName() + ' - ' + vs.getText())]
    return
  }
  const exportedVarDecl = exportedVariableDeclarations[0]
  if (!TypeGuards.isVariableDeclaration(exportedVarDecl)) {
    result.errors = [...result.errors, 'not a variable declaration  ' + exportedVarDecl.getText()]
    return
  }
  const exportName = exportedVarDecl.getName()
  const exportValue = exportedVarDecl.getInitializer().getText()
  if (exportedVarDecl.getText().trim() === exportedVar.getText().trim()) {
    exportStatement.remove()
  }

  //There could be other exports for interfaces and types - we want to keep them but outside define( handler)
  const statementOutsideHandler: string[] = []
  sourceFile.getStatements().filter(s => {
    return (TypeGuards.isInterfaceDeclaration(s) || TypeGuards.isTypeAliasDeclaration(s)) &&
      s.getDescendantsOfKind(SyntaxKind.ExportKeyword).length
  }).forEach(s => {
    statementOutsideHandler.push(s.getText())
    s.remove()
  })

  return {
    exportName, imports, exportValue, sourceFile, body: sourceFile.getText(),
    importsToIgnore, statementOutsideHandler: statementOutsideHandler.join('\n')
  }
}

export function printExport2DefineFileResult(r: Export2DefineSingleFileResult): string {
  return `
${r.importsToIgnore.join('\n')}
define('${r.exportName}', [${r.imports.map(imp => `'${imp.moduleSpecifier}'`).join(', ')}], function(${r.imports.map(i => `${i.name}: any`).join(', ')}){
  ${r.body}
  return ${r.exportValue}
})
${r.statementOutsideHandler}
  `
}
