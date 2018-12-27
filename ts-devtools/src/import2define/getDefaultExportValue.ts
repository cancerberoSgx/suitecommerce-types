import { SourceFile, TypeGuards, SyntaxKind, Identifier, Node, Statement } from "ts-simple-ast";
import { DefaultExportInfo } from "./import2defineOne";
import { Import2DefineConfig } from "./import2define";
export function getDefaultExportValue(f: SourceFile, config?: Import2DefineConfig): DefaultExportInfo {
  
  function postError(error: string): {error: string}{
    // result.errors = [...result.errors, m];
    config && config.debug && console.log(error, ` on file ${f.getFilePath()}`)
    return  { error };
  }

  const s = f.getDefaultExportSymbol();
  if (!s) {
    return postError('No default export found' )
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
    return postError("No default export for class, variable or function found 2")
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
    return postError('No default export for class, variable or function found 3' )
    // return { error: 'No default export for class, variable or function found 3' }
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