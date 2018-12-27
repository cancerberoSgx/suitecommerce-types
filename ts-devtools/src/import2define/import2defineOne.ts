import { ImportDeclaration, SourceFile, SyntaxKind, TypeGuards } from "ts-simple-ast";
import { defaultCustomImportSpecifiers, defaultIgnoreImportSpecifiers } from "./import2defineDefaults";
import { Import2DefineConfig, Import2DefineResult } from "./import2define";
import { shorter } from "../util/misc";

export function import2defineOne(config: Import2DefineConfig, sourceFile: SourceFile, result: Import2DefineResult): Import2DefineOneResult | undefined {
  // if(config.debug){
    // console.log('import2defineOne source file', sourceFile.getFilePath());
    
  // }
  const initialText = sourceFile.getText()
  const exportVerificationResults = exportVerification(sourceFile)
  if (exportVerificationResults.length) {
    result.errors = [...result.errors, ...exportVerificationResults]
    return
  }
  config.customImportSpecifiers = (config.customImportSpecifiers && config.customImportSpecifiers.length) ? config.customImportSpecifiers : defaultCustomImportSpecifiers;
  config.ignoreImportSpecifiers = (config.ignoreImportSpecifiers && config.ignoreImportSpecifiers.length) ? config.ignoreImportSpecifiers : defaultIgnoreImportSpecifiers;
  const importDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration);
  const imports: Import2DefineOneResultImport[] = [];
  const importsToIgnore: string[] = [];
  importDeclarations.forEach(id => {
    const moduleSpecifier = id.getModuleSpecifier().getLiteralText();
    if (config.ignoreImportSpecifiers.find(i => i.predicate(id))) {
      importsToIgnore.push(id.getText());
      id.remove();
      return;
    }
    const clause = id.getImportClause();
    if (!clause) {
      result.errors = [...result.errors, 'not import clause found / not supported:' + id.getText()];
      return;
    }
    const namedImports: string[] = clause.getNamedImports().length ? clause.getNamedImports().map(ni => ni.getName()) : [clause.getDefaultImport().getText()];
    if (!namedImports.length) {
      result.errors = [...result.errors, 'not named import found / not supported:' + id.getText()];
      return;
    }

    let importNamesToBeIgnored: string[] = []
    // let importNeedsToRemain=false
    namedImports.forEach(ni => {
      const customImportSpecifier = config.customImportSpecifiers.find(i => i.predicate(id, ni));
      const customImportSpecifierFn = customImportSpecifier ? customImportSpecifier.getImportSpecifier : ((id: ImportDeclaration, is: string) => moduleSpecifier);
      const finalImportSpecififier = customImportSpecifierFn(id, ni)
      if (finalImportSpecififier) {
        imports.push({
          name: ni,
          moduleSpecifier: finalImportSpecififier,
          importSpecifierSourceFile: !id.getModuleSpecifierSourceFile() ? undefined : id.getModuleSpecifierSourceFile()
        });
      } else {
        importNamesToBeIgnored.push(ni)
        // importNeedsToRemain=true
      }
    });
    if (importNamesToBeIgnored.length) {
      // if(importNeedsToRemain){
      // importsToIgnore.push(id.getText());
      importsToIgnore.push(`import { ${importNamesToBeIgnored.join(', ')} } from '${moduleSpecifier}'`);
    }
    id.remove();
  });
  if (sourceFile.getDescendantsOfKind(SyntaxKind.ExportAssignment).length) {
    result.errors = [...result.errors, 'not supported export statement found> ' + sourceFile.getDescendantsOfKind(SyntaxKind.ExportAssignment)[0].getText()];
    return;
  }
  const varStmts = sourceFile.getDescendantsOfKind(SyntaxKind.VariableStatement);
  const exportedVarStatements = varStmts.filter(vs => vs.getDescendantsOfKind(SyntaxKind.ExportKeyword).length);
  if (!exportedVarStatements.length) {
    result.errors = [...result.errors, 'no exported variable found in file ' + sourceFile.getFilePath()];
    return;
  }
  if (exportedVarStatements.length > 1) {
    result.errors = [...result.errors, 'multiple variables exported not supported A: ' + exportedVarStatements.map(vs => vs.getText())];
    return;
  }
  const exportStatement = exportedVarStatements[0];
  const exportedVar = exportStatement.getDescendantsOfKind(SyntaxKind.VariableDeclaration)[0];
  const exportedVariableDeclarations = exportedVar.findReferences()
    .map(r => r.getDefinition().getDeclarationNode())
    //TODO> do this better, perhaps negatively filtering importspecifier
    .filter(r => r && r.getKindName().endsWith('Declaration') && r.getSourceFile() === sourceFile);
  if (exportedVariableDeclarations.length !== 1) {
    result.errors = [...result.errors, 'exported variable declaration is not 1: ' + exportedVariableDeclarations.map(vs => vs.getKindName() + ' - ' + vs.getText())];
    return;
  }
  const exportedVarDecl = exportedVariableDeclarations[0];
  if (!TypeGuards.isVariableDeclaration(exportedVarDecl)) {
    result.errors = [...result.errors, 'not a variable declaration  ' + exportedVarDecl.getText()];
    return;
  }
  const exportName = exportedVarDecl.getName();
  const exportValue = exportedVarDecl.getInitializer().getText();
  if (exportedVarDecl.getText().trim() === exportedVar.getText().trim()) {
    exportStatement.remove();
  }
  //There could be other exports for interfaces and types - we want to keep them but outside define( handler)
  const statementOutsideHandler: string[] = [];
  sourceFile.getStatements().filter(s => {
    return (TypeGuards.isInterfaceDeclaration(s) || TypeGuards.isTypeAliasDeclaration(s)) &&
      s.getDescendantsOfKind(SyntaxKind.ExportKeyword).length;
  }).forEach(s => {
    statementOutsideHandler.push(s.getText());
    s.remove();
  });

  if(importsToIgnore.length===0){
    // workaround for tsc issue : tests/tsc-issue-importHelper/README.md
    importsToIgnore.push("import { Application } from 'sc-types-frontend'")
  }
  const response ={
    exportName, imports, exportValue, sourceFile, 
    body: sourceFile.getText(), importsToIgnore, 
    statementOutsideHandler: statementOutsideHandler.join('\n')
  }
  config.debug && console.log('import2defineOne finish', {initialText, result, response });
  return response;
}

export interface Import2DefineOneResult {
  sourceFile: SourceFile;
  exportName: string;
  imports: Import2DefineOneResultImport[];
  exportValue: string;
  body: string;
  statementOutsideHandler: string;
  importsToIgnore: string[];
}

export interface Import2DefineOneResultImport {
  name: string;
  moduleSpecifier: string;
  importSpecifierSourceFile: SourceFile | undefined;
}

export function printImport2DefineOneResult(r: Import2DefineOneResult): string {
  return `
${r.importsToIgnore.join('\n')}
define('${r.exportName}', [${r.imports.map(imp => `'${imp.moduleSpecifier}'`).join(', ')}], function(${r.imports.map(i => `${i.name}: any`).join(', ')}){
  ${r.body}
  return ${r.exportValue}
})
${r.statementOutsideHandler}
  `;
}

function exportVerification(sourceFile: SourceFile): string[] {
  // debugger
  const exportsNotInTypeDeclaration = sourceFile
    .getDescendantsOfKind(SyntaxKind.ExportKeyword)
    .filter(e => !TypeGuards.isInterfaceDeclaration(e.getParent()) &&
      !TypeGuards.isTypeAliasDeclaration(e.getParent()))
  if (exportsNotInTypeDeclaration.length > 1) {
    return [`Sorry you can only have one export for a non interface/type declaration and you have these: ${exportsNotInTypeDeclaration.map(e => shorter(e.getParent().getText())).join('"\n , "\n')}`]
  }
  else {
    return []
  }
}