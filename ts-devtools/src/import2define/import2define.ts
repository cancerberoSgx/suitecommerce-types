import { AbstractConfig, AbstractResult } from "../compileAndFix/compileAndFix";
import { compileTsProject } from "../util/compileTsProject";
import { Project, TypeGuards, CallExpression, SyntaxKind, SourceFile, ts, SyntaxList } from "ts-simple-ast";

export interface Export2DefineConfig extends AbstractConfig {
  // replaceNamedImportExpression(variableName: string, dependencyName: string): string
  fakeImportSpecifiers?: string[]
  ignoreImportSpecifiers?: string[]
}

export interface Export2DefineResult extends AbstractResult {

}

export function export2define(config: Export2DefineConfig): Export2DefineResult {
  const result: Export2DefineResult = {
    errors: []
  }

  const project = new Project({
    tsConfigFilePath: config.tsconfigJsonPath
  })
  const results: { sourceFile: SourceFile, result: string }[] = project.getSourceFiles().map(sourceFile => ({ sourceFile, result: export2defineSingleFile(config, sourceFile, result) }))

  // const sourceFile = project.createSourceFile('test3.ts', code)
  // const { emittedFileNames, tscFinalCommand } = compileTsProject(config)
  return null
}

// export interface Export2DefineSingleFileResult extends Export2DefineResult{

// }
export function export2defineSingleFile(config: Export2DefineConfig, sourceFile: SourceFile, result: Export2DefineResult): string {
  config.fakeImportSpecifiers = (config.fakeImportSpecifiers && config.fakeImportSpecifiers.length) ? config.fakeImportSpecifiers : ['suitecommerce']

  config.ignoreImportSpecifiers = (config.ignoreImportSpecifiers && config.ignoreImportSpecifiers.length) ? config.ignoreImportSpecifiers : ['sc-types-frontend']
  const importDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration)
  const imports: { name: string, moduleSpecifier: string }[] = []
  importDeclarations.forEach(id => {
    const moduleSpecifier = id.getModuleSpecifier().getLiteralText()
    if (config.ignoreImportSpecifiers.includes(moduleSpecifier)) {
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

    namedImports.map(ni => {

      imports.push({ name: ni.getName(), moduleSpecifier })
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

  if (exportedVarStatements[0].getDescendantsOfKind(SyntaxKind.VariableDeclaration).length !== 1) {
    result.errors = [...result.errors, 'multiple variables exported not supported: ' + exportedVarStatements[0].getText()]
    return
  }
  const exportedVar = exportedVarStatements[0].getDescendantsOfKind(SyntaxKind.VariableDeclaration)[0]
  const exportedVariableDeclarations = exportedVar.findReferences().map(r => r.getDefinition().getDeclarationNode())
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

  // exportedVarStatements[0]
  // const exportedVarDeclarations = flat(exportedVarStatements.map(vs=>)

  exportedVarStatements[0].remove()
  return `
define('${exportName}', [${imports.map(imp => `'${config.fakeImportSpecifiers.includes(imp.moduleSpecifier) ? imp.name : imp.moduleSpecifier}'`).join(', ')}], function(${imports.map(i => `'${i.name}'`).join(', ')}){
  return ${exportValue}
})
  `

}


// export function flat<T>(arr: T[][]): T[] {
//   return arr.reduce((a, b) => a.concat(b))
// }
