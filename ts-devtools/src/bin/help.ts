export const help = `

 * tsconfigFilePath (string): mandatory - assumes tsconfig.json file is in the root project path. The project must have typescript installed locally and that will be used to compile
 * outputFolder (string): optional - if not given will use given tsconfig.json default dest
 * cleanOutputFolder (boolean): optional - 
 * breakOnFirstError (boolean): optional - 
 * skipLinkInputProjectFiles (boolean): optional - if outputFolder is declared then all input project files like node_modules, package.json, etc need to be present in the new project for it work. Set this to true to not do it so.
 * eslintFix (boolean): optional - if true will run \`npx eslint --fix\` before writing the files using the target project cwd. 
Note that the target project needs to have support for eslint (all dependencies installed locally)
and have a tslintrc file available since the project will be defining indentation style.
 * debug (boolean): optional - 


 * addTslibJsInFolder (string): optional - if set, it will add tslib.js (AMD module) in given path that must be relative to \`tsconfigJsonPath\`


 * customImportSpecifiers (CustomImportSpecifier[]): optional - 
 * ignoreImportSpecifiers (IgnoreImportSpecifier[]): optional - 

`.replace(/\n\n/gm, '')
