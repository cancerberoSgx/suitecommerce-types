import { SourceFile, TypeGuards, SyntaxKind, Identifier, Node, Statement } from "ts-simple-ast";
import { DefaultExportInfo } from "./import2defineOne";
import { Import2DefineConfig } from "./import2define";
import { shorter } from "../util/misc";
import { join } from "path";
export function getDefaultExportValue(f: SourceFile, config?: Import2DefineConfig): DefaultExportInfo {
  
  const err1 = checkNonDefaultExportedValueNodes(f)
  if(err1){return{error: err1}}

  // function postError(error: string): {error: string}{
  //   // result.errors = [...result.errors, m];
  //   // console.log({config})
  //   // config && config.debug && console.log(error, ` on file ${f.getFilePath()}`)
  //   return  { error };
  // }

  // function isDataDeclaration(n: Node): boolean {
  //   return TypeGuards.isClassDeclaration(n)||TypeGuards.isFunctionDeclaration(n)||
  // }
  
// debugger
  const s = f.getDefaultExportSymbol();
  if (!s) {
    //  means file doesn't have any default export, however, is valid for exporting only types. 
  //   return postError('No default export found' )
  return {
    exportValue: 'undefined'
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

  // debugger
  let ns: Node, decl0: Node
  if ((!exportValue || exportValue === 'unknown') && s.getDeclarations().length && 
  (ns = (decl0 = s.getDeclarations()[0]).getNextSibling()) ) {
    if (TypeGuards.isVariableStatement(ns)) {
      const vd = ns.getFirstDescendantByKind(SyntaxKind.VariableDeclaration)
      if (vd.getName()) {
        exportValue = vd.getName()
      }
      else if (vd.hasInitializer()) {
        exportValue = vd.getInitializer().getText()
      }
      // else {
      //   // exportValue = nsid.getText()
      //   // error
      //   return { error: "exportValue === 'unknown' and cannot find identifiers or initializers in next sibling variable decalration" }
      // }
    }

    
  }
  // debugger
  if ((!exportValue || exportValue === 'unknown' )&& TypeGuards.isExportAssignment(decl0)) {
    // const expr = decl0.getExpression()

        exportValue =  decl0.getExpression().getText()
    // if(TypeGuards.isCallExpression(expr)){

    // }
      // const id2 = decl0.getFirstDescendantByKind(SyntaxKind.Identifier)
      // if (id2) {
      //   // return {error}
      //   exportValue = id2.getText()
      // }
    }

  
  if (!exportValue || exportValue === 'unknown'){
    // debugger
    return {error: "No default export for class, variable or function found 2"}
    // return { error: "No default export for class, variable or function found 2" }
    //TODO: error
  }


  // s.getDeclarations()[0].getNextSibling()


  // const bb = TypeGuards.isFunctionDeclaration(s.getDeclarations()[0])
  const exportStatement = s.getDeclarations()
    // TODO: filter by this file declarations - could be outsie this file dont wantto export those
    .filter(d => TypeGuards.isFunctionDeclaration(d) || TypeGuards.isClassDeclaration(d) || TypeGuards.isExportAssignment(d))
    // .find(TypeGuards.isStatement);
    .find(d => (d as any).remove)
  // debugger
  if (!exportStatement) {
    // debugger
    //TODO: error
    return {error: 'No default export for class, variable or function found 3' }
  }
  // if(!exportStatement||!exportStatement.length) {
  //   return {error: 'no default export for class, function or variable found'}
  // }
  // const diagnostics = f.getPreEmitDiagnostics().map(d=>d.getMessageText())
  const exportName = f.getBaseNameWithoutExtension();
  const error = (!exportStatement ? 'No default export for class, variable or function found' : undefined) || (!exportValue ? '!exportValue' : undefined) || (!exportName ? '!exportName' : undefined);
  // ||((diagnostics && diagnostics.length) ? ('Compiler errors detected: '+diagnostics.map(d=>d.toString()).join(', ')) : undefined)
  return { exportValue, exportStatement: exportStatement as any as Statement, exportName, error };
}


function checkNonDefaultExportedValueNodes(f: SourceFile): string|undefined{
  const allExportSymbols = f.getExportSymbols()
  const defaultExportSymbol = f.getDefaultExportSymbol()
  const nonDefaultExportSymbols = allExportSymbols.filter(s=>s!==defaultExportSymbol)
  const nonDefaultExportedValueNodes=nonDefaultExportSymbols.map(s=>s.getValueDeclaration()).filter(s=>s)//.map(s=>s.getText())
  if(nonDefaultExportedValueNodes.length) {
    return 'You cannot export declaration with values unless they are default exports. Currently you have: '+nonDefaultExportedValueNodes.map(n=>`${n.getKindName()} ${shorter(n.getText(), 20)}`).join(', ')
  }

  const keywords = f.getDescendantsOfKind(SyntaxKind.ExportKeyword)
  const nonDefaultLiteralExported = keywords.filter(k=>{
    const expr1 = k.getNextSiblings().find(TypeGuards.isExpressionStatement)
    if(expr1){
      const isLiteral = !!TypeGuards.isLiteralExpression(expr1.getExpression())
      const isDefaultExported = !!expr1.getNextSiblings().find(n=>n.getKind()===SyntaxKind.DefaultKeyword)
      return isLiteral && !isDefaultExported
    }
  })
'You cannot export a value unless as default export. Currently you have: '+nonDefaultLiteralExported.map(n=>`${n.getKindName()} ${shorter(n.getText(), 20)}`).join(', ')  
if( nonDefaultLiteralExported.length){
    return 'You cannot export a literal value unless as default export. Currently you have: '+nonDefaultLiteralExported.map(n=>n.getParent()||n).map(n=>`${n.getKindName()} ${shorter(n.getText(), 20)}`).join(', ')  
  }
}