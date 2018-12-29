import { Import2DefineOneResult } from "./import2defineOne";
export function import2DefineOnePrintResult(r: Import2DefineOneResult, addTypes: boolean = true): string {
  // heads up - we need to create also types for define handler params since users might be using those values as types.
  const PP2 = '_un2_iQu3_';
  // const PP1 = '_un1_iQu3_';
  const Type = addTypes ? `<I=(any|${PP2}),J=(any|${PP2}),K=(any|${PP2}),L=(any|${PP2}),M=(any|${PP2})>=any|${PP2}` : ''
  r.exportName = r.exportName || r.sourceFile.getBaseNameWithoutExtension()
  return `
${addTypes ? `
type ${PP2}<I=any,J=any,K=any,L=any,M=any>=any
${r.imports.map(i => `type ${i.name}${Type}`).join('\n')}
${(isValidIdentifier(r.exportName) && (!r.statementOutsideHandler.includes(`type ${r.exportName}`))&& (!r.statementOutsideHandler.includes(`interface ${r.exportName}`))) ? `type ${r.exportName}${Type}` : ''}
` : ''}
${r.importsToIgnore.join('\n')}
define('${r.exportName}', [${r.imports.map(imp => `'${imp.moduleSpecifier||imp.name}'`).join(', ')}], function(${r.imports.map(i => `${i.name}: any`).join(', ')}){
  ${r.body}
  return ${r.exportValue}
})
${r.statementOutsideHandler}
`;
}
function isValidIdentifier(s: string): boolean {
  return s && !!s.match(/^[a-z0-9_]+$/i);
}