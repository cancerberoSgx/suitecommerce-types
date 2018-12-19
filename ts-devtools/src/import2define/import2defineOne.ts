import { ImportDeclaration, SourceFile, Statement, SyntaxKind, TypeGuards } from "ts-simple-ast"
import { getDefaultExportValue, _getDefaultExportValueReset } from "./getDefaultExportValue"
import { Import2DefineConfig, Import2DefineResult } from "./import2define"
import { defaultCustomImportSpecifiers, defaultIgnoreImportSpecifiers } from "./import2defineDefaults"
import { memorizeSourceFile, namedImportReferenceIsType, _namedImportReferenceIsTypeReset } from "./namedImportReferenceIsType";


export function _import2defineOneReset() {
  _namedImportReferenceIsTypeReset()
  _getDefaultExportValueReset()
}

export function import2defineOne(config: Import2DefineConfig, sourceFile: SourceFile, result: Import2DefineResult): Import2DefineOneResult | undefined {

  memorizeSourceFile(sourceFile)

  function postError(m: string): undefined {
    result.errors = [...result.errors, m]
    config.debug && console.log(m, ` on file ${sourceFile.getFilePath()}`)
    return
  }

  config.customImportSpecifiers = (config.customImportSpecifiers && config.customImportSpecifiers.length) ? config.customImportSpecifiers : defaultCustomImportSpecifiers
  config.ignoreImportSpecifiers = (config.ignoreImportSpecifiers && config.ignoreImportSpecifiers.length) ? config.ignoreImportSpecifiers : defaultIgnoreImportSpecifiers
  const importDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration)
  const imports: Import2DefineOneResultImport[] = []
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
      return postError('not import clause found / not supported 1:' + id.getText())
    }
    const namedImports: string[] = [].concat(clause.getNamedImports()).concat([clause.getDefaultImport()]).filter(i => i).map(i => i.getText())
    if (!namedImports.length) {
      return postError('not import clause found / not supported 2:' + id.getText())
    }
    let importNamesToBeIgnored: string[] = []
    if (!namedImports.length) {
      debugger
    }
    namedImports.forEach(ni => {
      let isType: boolean = namedImportReferenceIsType(id, ni)
      if (isType) {
        // if is importing a type we want to keep the import and not include the type as AMD dependency
        importNamesToBeIgnored.push(ni)
      } else {
        const customImportSpecifier = config.customImportSpecifiers.find(i => i.predicate(id, ni))
        const importSpecifierBuilder = customImportSpecifier ? customImportSpecifier.getImportSpecifier : defaultImportSpecifierBuilder
        const finalImportSpecifier = importSpecifierBuilder(id, ni)
        if (finalImportSpecifier) {
          imports.push({
            name: ni,
            moduleSpecifier: finalImportSpecifier,
            importSpecifierSourceFile: !id.getModuleSpecifierSourceFile() ? undefined : id.getModuleSpecifierSourceFile()
          })
        } else {
          importNamesToBeIgnored.push(ni)
        }
      }
    })
    if (importNamesToBeIgnored.length) {
      importsToIgnore.push(`import { ${importNamesToBeIgnored.join(', ')} } from '${moduleSpecifier}'`)
    }
    id.remove()
  })

  const { error, exportName, exportValue, exportStatement } = getDefaultExportValue(sourceFile, config)
  // HEADS UP:  notice that it's valid that a file doesn't have any default exports - users can group interfaces and type as named exports if they want. 
  if (error) {
    return postError(error)
  }
  if (exportStatement) {
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
  if (importsToIgnore.length === 0) {
    // workaround for tsc issue : tests/tsc-issue-importHelper/README.md
    importsToIgnore.push("import { Application } from 'sc-types-frontend'")
  }
  const response = {
    exportName, 
    imports, 
    exportValue, 
    sourceFile,
    body: sourceFile.getText(), 
    importsToIgnore,
    statementOutsideHandler: statementOutsideHandler.join('\n')
  }
  if (config.debug) {
    console.log('import2defineOne finish', { exportName: response.exportName, imports: response.imports.map(i => i.moduleSpecifier).join(', '), importsToIgnore: response.importsToIgnore.join(', ') })
  }
  return response
}


function defaultImportSpecifierBuilder(id: ImportDeclaration, is: string) {
  return id.getModuleSpecifier().getLiteralText()
}


export interface Import2DefineOneResult {
  sourceFile: SourceFile
  exportName: string
  imports: Import2DefineOneResultImport[]
  exportValue: string
  body: string
  statementOutsideHandler: string
  importsToIgnore: string[]
}

export interface Import2DefineOneResultImport {
  name: string
  moduleSpecifier: string
  importSpecifierSourceFile: SourceFile | undefined
}


