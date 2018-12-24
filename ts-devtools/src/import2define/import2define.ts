import { AbstractConfig, AbstractResult } from "../compileAndFix/compileAndFix";
import { compileTsProject } from "../util/compileTsProject";
import { Project, TypeGuards, CallExpression, SyntaxKind, SourceFile, ts, SyntaxList, ImportDeclaration, NamedImports, ImportSpecifier } from "ts-simple-ast";

export interface Export2DefineConfig extends AbstractConfig {
  // replaceNamedImportExpression(variableName: string, dependencyName: string): string
  customImportSpecifiers?: { [importSpecifier: string]: (id: ImportDeclaration, ni: ImportSpecifier) => string }
  ignoreImportSpecifiers?: string[]
}

export interface Export2DefineResult extends AbstractResult {
  perFileResults: Export2DefineSingleFileResult[]
}

export function export2define(config: Export2DefineConfig): Export2DefineResult {
  const project = new Project({
    tsConfigFilePath: config.tsconfigFilePath
  })
  return export2defineProject({ project, tsconfigFilePath: config.tsconfigFilePath })
}


export function export2defineProject(config: Export2DefineConfig & { project: Project }): Export2DefineResult {
  const result: Export2DefineResult = {
    errors: [],
    perFileResults: []
  }
  result.perFileResults = config.project.getSourceFiles()

    .map(sourceFile => {
      return result.errors.length ? undefined : export2defineSingleFile(config, sourceFile, result)
      //TODO support config.breakOnFirstError
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
  sourceFile: SourceFile,
  exportName: string,
  imports: Export2DefineSingleFileResultImport[],
  exportValue: string
  body: string
}

export interface Export2DefineSingleFileResultImport {
  name: string,
  moduleSpecifier: string,
  importSpecifierSourceFile: SourceFile | undefined
}

export const defaultCustomImportSpecifiers = {
  'suitecommerce': (id: ImportDeclaration, ni: ImportSpecifier) => ni.getName()
}

export function export2defineSingleFile(config: Export2DefineConfig, sourceFile: SourceFile, result: Export2DefineResult): Export2DefineSingleFileResult {
  config.customImportSpecifiers = (config.customImportSpecifiers && config.customImportSpecifiers.length) ? config.customImportSpecifiers : defaultCustomImportSpecifiers

  config.ignoreImportSpecifiers = (config.ignoreImportSpecifiers && config.ignoreImportSpecifiers.length) ? config.ignoreImportSpecifiers : ['sc-types-frontend']
  const importDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration)
  const imports: Export2DefineSingleFileResultImport[] = []
  importDeclarations.forEach(id => {
    const moduleSpecifier = id.getModuleSpecifier().getLiteralText()
    if (config.ignoreImportSpecifiers.includes(moduleSpecifier)) {
      id.remove()
      return
    }
    const clause = id.getImportClause()
    if (!clause) {
      result.errors = [...result.errors, 'not import clause found / not supported:' + id.getText()]
      return
    }
    const namedImports = clause.getNamedImports()
    if (!namedImports) {
      result.errors = [...result.errors, 'not named import found / not supported:' + id.getText()]
      return
    }
    const customImportSpecifier = config.customImportSpecifiers[moduleSpecifier] || ((id: ImportDeclaration, is: ImportSpecifier) => moduleSpecifier)

    namedImports.map(ni => {
      imports.push({
        name: ni.getName(),
        moduleSpecifier: customImportSpecifier(id, ni),
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
    result.errors = [...result.errors, 'no exported variable found']
    return
  }
  if (exportedVarStatements.length > 1) {
    result.errors = [...result.errors, 'multiple variables exported not supported: ' + exportedVarStatements.map(vs => vs.getText())]
    return
  }

  const exportStatement = exportedVarStatements[0]
  if (exportStatement.getDescendantsOfKind(SyntaxKind.VariableDeclaration).length !== 1) {
    result.errors = [...result.errors, 'multiple variables exported not supported: ' + exportedVarStatements[0].getText()]
    return
  }
  const exportedVar = exportStatement.getDescendantsOfKind(SyntaxKind.VariableDeclaration)[0]
  const exportedVariableDeclarations = exportedVar.findReferences()
    .map(r => r.getDefinition().getDeclarationNode())
    .filter(r => !!r)

  if (exportedVariableDeclarations.length !== 1) {
    result.errors = [...result.errors, 'exported variable declaration is not 1: ' + exportedVariableDeclarations.map(vs => vs.getText())]
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
  return { exportName, imports, exportValue, sourceFile, body: sourceFile.getText() }
}

export function export2defineSingleFileString(r: Export2DefineSingleFileResult): string {
  return `
define('${r.exportName}', [${r.imports.map(imp => `'${imp.moduleSpecifier}'`).join(', ')}], function(${r.imports.map(i => `${i.name}`).join(', ')}){
  ${r.body}
  return ${r.exportValue}
})
  `
}
