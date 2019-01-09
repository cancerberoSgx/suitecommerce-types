import { Project, TypeGuards, CallExpression, SyntaxKind, SourceFile } from "ts-simple-ast";
import { FixAmdTslibResult, FixAmdTslibConfig } from "./types";
import { suiteCommerceExtraDependencies } from "../import2define/import2defineDefaults";
import { quote } from "../util/misc";


/** will remove first statement `var $VARNAME = require("tslib")` found anbd return $VARNAME */
export function addTslibAmdDependency(config: FixAmdTslibConfig): FixAmdTslibResult {
  const result: FixAmdTslibResult = {
    errors: [],
    outputCode: undefined,
    variableName: undefined
  }
  // TODO: perhaps reusing the same project instead of creating is faster 
  // TODO: virtual fs ?
  const project = new Project();
  const sourceFile = project.createSourceFile('input2.js', config.inputCode)
  const callExpression = sourceFile.getFirstDescendant(node =>
    TypeGuards.isCallExpression(node) &&
    node.getText().trim().startsWith('define')) as CallExpression
  if (!callExpression) {
    return { ...result, errors: ['no define() CallExpression found'] }
  }
  if (config.variableName) {
    const args = callExpression.getArguments()
    //TODO args.length must be at least 2
    const dependencyNames = args[args.length - 2]
    if (!TypeGuards.isArrayLiteralExpression(dependencyNames)) {
      return { ...result, errors: ['define() dependencyNames argument is not ArrayLiteralExpression'] }
    }
    const dependencyHandler = args[args.length - 1]
    if (!TypeGuards.isFunctionExpression(dependencyHandler)) {
      return { ...result, errors: ['define() dependencyHandler argument is not isFunctionExpression'] }
    }
    // TODO: could be arrow, or even a variable name referencing a function !
    dependencyNames.addElement(`"${config.tslibDependencyName || 'tslib'}"`)
    dependencyHandler.addParameter({ name: config.variableName })

    // add extra dependency (SCA issue for running tests). TODO: this shouldn't be here- kind of a hack for gulp unit-test to work on SCA
    if(config.addExtraAmdDependendenciesForSCAUnitTests){
      if(config.debug){
        console.log('addExtraAmdDependendenciesForSCAUnitTests adds: ', suiteCommerceExtraDependencies.map(e=>`'${e}'`));
      }
      dependencyNames.addElements(suiteCommerceExtraDependencies.map(e=>`'${e}'`))
    }

  }
  if(config.formatJsOutput){
    // TODO: format settings
    sourceFile.formatText() 
    // sourceFile.organizeImports()
  }
  return {
    ...result,
    variableName: config.variableName,
    outputCode: sourceFile.getText()
  }
}

