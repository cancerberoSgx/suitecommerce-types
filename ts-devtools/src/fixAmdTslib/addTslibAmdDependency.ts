import { Project, TypeGuards, CallExpression, SyntaxKind, SourceFile } from "ts-simple-ast";
import { FixAmdTslibResult, FixAmdTslibConfig } from "./types";


/** will remove first statement `var $VARNAME = require("tslib")` found anbd return $VARNAME */
export function addTslibAmdDependency(config: FixAmdTslibConfig): FixAmdTslibResult {
  const result: FixAmdTslibResult = {
    errors: [],
    outputCode: undefined,
    variableName: undefined
  }
  // TODO: perhaps reusing the same project instead of creating is faster 
  //TODO: virtual ffs ?
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
    //TODO> could be arrow, or even a variable name referencing a function !
    dependencyNames.addElement(`"${config.tslibDependencyName || 'tslib'}"`)
    dependencyHandler.addParameter({ name: config.variableName })
  }
  return {
    ...result,
    variableName: config.variableName,
    outputCode: sourceFile.getText()
  }
}

