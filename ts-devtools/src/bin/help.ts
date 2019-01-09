export const help = `

 * tsconfigFilePath (string): mandatory - assumes tsconfig.json file is in the root project path. The project must have typescript installed locally and that will be used to compile
 * outputFolder (string): optional - if not given will use given tsconfig.json default dest
 * cleanOutputFolder (boolean): optional - 
 * breakOnFirstError (boolean): optional - if true will abort on any error
 * skipLinkInputProjectFiles (boolean): optional - if outputFolder is declared then all input project files like node_modules, package.json, etc need to be present in the new project for it work. Set this to true to not do it so.
 * debug (boolean): optional - 


 * addTslibJsInFolder (string): optional - if set, it will add tslib.js (AMD module) in given path that must be relative to \`tsconfigJsonPath\`
 * outputFolder (string): mandatory - 
 * formatJsOutput (boolean): optional - if true it will format generated .js output files using TypeScript formatting API
 * addExtraAmdDependendenciesForSCAUnitTests (boolean): optional - will add extra AMD dependencies to the end of the list on each file. This is a workaround so SCA gulp local and gulp unit-test works since SCA issue regarding not requiring necessary dependencies automatically


 * customImportSpecifiers (CustomImportSpecifier[]): optional - 
 * ignoreImportSpecifiers (IgnoreImportSpecifier[]): optional - 

`.replace(/\\n\\n/gm, '')
