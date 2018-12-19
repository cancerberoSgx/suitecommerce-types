import { shorter } from "misc-utils-of-mine";
import { Node, SourceFile, Statement, SyntaxKind, TypeGuards } from "ts-simple-ast";
import { Import2DefineConfig } from "./import2define";

export const DUMMY_MODULE_FLAG = '_-_Dummy_-_'

export function getDefaultExportValue(f: SourceFile, config?: Import2DefineConfig): DefaultExportInfo {

  const err1 = checkNonDefaultExportedValueNodes(f)
  if (err1) {
    return { error: err1 }
  }

  const s = f.getDefaultExportSymbol();
  if (!s) {
    //  means file doesn't have any default export, however, is valid for exporting only types. 
    return {
      exportValue: 'undefined',
      exportName: DUMMY_MODULE_FLAG
    }
  }

  let exportValue;
  let vc = s.getValueDeclaration();
  if (vc) {
    const text = vc.getText().trim();
    if (text.startsWith('export default')) {
      exportValue = text.substring('export default'.length, text.length);
    }
  }
  if (!exportValue && s.getAliasedSymbol()) {
    exportValue = s.getAliasedSymbol().getEscapedName();
  }

  let ns: Node, decl0: Node
  if ((!exportValue || exportValue === 'unknown') && s.getDeclarations().length &&
    (ns = (decl0 = s.getDeclarations()[0]).getNextSibling())) {
    if (TypeGuards.isVariableStatement(ns)) {
      const vd = ns.getFirstDescendantByKind(SyntaxKind.VariableDeclaration)
      if (vd.getName()) {
        exportValue = vd.getName()
      }
      else if (vd.hasInitializer()) {
        exportValue = vd.getInitializer().getText()
      }
    }
  }

  if ((!exportValue || exportValue === 'unknown') && TypeGuards.isExportAssignment(decl0)) {
    exportValue = decl0.getExpression().getText()
  }

  if (!exportValue || exportValue === 'unknown') {
    return { error: "No default export for class, variable or function found 2" }
  }

  const exportStatement = s.getDeclarations()
    // TODO: filter by this file declarations - could be outside this file dont want to export those
    .filter(d => TypeGuards.isFunctionDeclaration(d) || TypeGuards.isClassDeclaration(d) || TypeGuards.isExportAssignment(d))
    .find(d => (d as any).remove)
  if (!exportStatement) {
    return { error: 'No default export for class, variable or function found 3' }
  }
  const exportName = f.getBaseNameWithoutExtension();
  const error = (!exportStatement ? 'No default export for class, variable or function found' : undefined) || (!exportValue ? '!exportValue' : undefined) || (!exportName ? '!exportName' : undefined);
  return {
    exportValue,
    exportStatement: exportStatement as any as Statement,
    exportName, error
  };
}

export interface DefaultExportInfo { error?: string, exportValue?: string, exportStatement?: Statement, exportName?: string }

function checkNonDefaultExportedValueNodes(f: SourceFile): string | undefined {
  const allExportSymbols = f.getExportSymbols()
  const defaultExportSymbol = f.getDefaultExportSymbol()
  const nonDefaultExportSymbols = allExportSymbols.filter(s => s !== defaultExportSymbol)
  const nonDefaultExportedValueNodes = nonDefaultExportSymbols.map(s => s.getValueDeclaration()).filter(s => s)//.map(s=>s.getText())
  if (nonDefaultExportedValueNodes.length) {
    return 'You cannot export declaration with values unless they are default exports. Currently you have: ' + nonDefaultExportedValueNodes.map(n => `${n.getKindName()} ${shorter(n.getText(), 20)}`).join(', ')
  }
  const keywords = f.getDescendantsOfKind(SyntaxKind.ExportKeyword)
  const nonDefaultLiteralExported = keywords.filter(k => {
    const expr1 = k.getNextSiblings().find(TypeGuards.isExpressionStatement)
    if (expr1) {
      const isLiteral = !!TypeGuards.isLiteralExpression(expr1.getExpression())
      const isDefaultExported = !!expr1.getNextSiblings().find(n => n.getKind() === SyntaxKind.DefaultKeyword)
      return isLiteral && !isDefaultExported
    }
  })
  if (nonDefaultLiteralExported.length) {
    return 'You cannot export a literal value unless as default export. Currently you have: ' + nonDefaultLiteralExported.map(n => n.getParent() || n).map(n => `${n.getKindName()} ${shorter(n.getText(), 20)}`).join(', ')
  }
}


// let _counter = 0
export function _getDefaultExportValueReset() {
  // _counter = 0
}