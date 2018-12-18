export const help = `

 * tsconfigFilePath (string): mandatory - assumes tsconfig.json file is in the root project path. The project must have typescript installed locally and that will be used to compile
 * outputFolder (string): optional - if not given will use given tsconfig.json default dest
 * cleanOutputFolder (boolean): optional - 
 * breakOnFirstError (boolean): optional - if true will abort on any error
 * skipLinkInputProjectFiles (boolean): optional - if outputFolder is declared then all input project files like node_modules, package.json, etc need to be present in the new project for it work. Set this to true to not do it so.
 * debug (boolean): optional - 
 * dependencyPrefix (string): optional - If specified all dependency names will be prefixed with it. 
This way, one can make sure AMD dependency names don't collide with other modules so it's possible to use 
simple file names like \`Manager.ts\`. Also output .js file names will be prefixed


 * addTslibJsInFolder (string): optional - if set, it will add tslib.js (AMD module) and other extra modules, in given path. If path is relative it will be  relative to \`tsconfigJsonPath\`. If you don't pass the argument the value will be 'src'. Passing value '0' won't add any file (internal use)
 * outputFolder (string): mandatory - 
 * formatJsOutput (boolean): optional - if true it will format generated .js output files using TypeScript formatting API
 * addExtraAmdDependendenciesForSCAUnitTests (string): optional - comma separated of extra SCA AMD dependencies that will be added to the end of the list on each file. This is a workaround so SCA gulp local and gulp unit-test works since SCA issue regarding not requiring necessary dependencies automatically


 * customImportSpecifiers (CustomImportSpecifier[]): optional - 
 * ignoreImportSpecifiers (IgnoreImportSpecifier[]): optional - 

`.replace(/\\n\\n/gm, '')
