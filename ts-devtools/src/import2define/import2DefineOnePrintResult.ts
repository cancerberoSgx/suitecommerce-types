import { Import2DefineOneResult, Import2DefineOneResultImport } from "./import2defineOne";
import { DUMMY_MODULE_FLAG } from "./getDefaultExportValue";

export function import2DefineOnePrintResult(r: Import2DefineOneResult, addTypes: boolean = true): string {
  // heads up - we need to create also types for define handler params since users might be using those values as types.
  const PP2 = '_un2_iQu3_';
  const Type = addTypes ? `<I=(any|${PP2}),J=(any|${PP2}),K=(any|${PP2}),L=(any|${PP2}),M=(any|${PP2})>=any|${PP2}` : ''
  r.exportName = r.exportName || r.sourceFile.getBaseNameWithoutExtension()
  return `
${addTypes ? `
type ${PP2}<I=any,J=any,K=any,L=any,M=any>=any
${r.imports.map(i => `type ${i.name}${Type}`).join('\n')}
${(isValidIdentifier(r.exportName) && (!r.statementOutsideHandler.includes(`type ${r.exportName}`)) && (!r.statementOutsideHandler.includes(`interface ${r.exportName}`))) ? `type ${r.exportName}${Type}` : ''}
` : ''}
${r.importsToIgnore.join('\n')}
${r.exportName ? `
define('${r.exportName}', [${r.imports.map(imp => `'${getDependencyName(imp)}'`).join(', ')}], function(${r.imports.map(i => `${i.variableName || i.name}: any`).join(', ')}){
  ${r.body}
  return ${r.exportValue}
})
` : ``}
${r.statementOutsideHandler}
`;
}

function isValidIdentifier(s: string): boolean {
  return s && !!s.match(/^[a-z0-9_]+$/i);
}

// TODO: workaround for an import2defineOne issue - DUMMy modules should never come here.
function getDependencyName(imp: Import2DefineOneResultImport): string {
  let name = imp.moduleSpecifier || imp.name
  // return name
  return name.includes(DUMMY_MODULE_FLAG) ? 'Backbone' : name
}
