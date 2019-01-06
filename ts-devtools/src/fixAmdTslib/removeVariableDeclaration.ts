import { CallExpression, Project, SyntaxKind, TypeGuards } from "ts-simple-ast";
import { FixAmdTslibConfig, FixAmdTslibResult } from "./types";


/** will remove first statement `var $VARNAME = require("tslib")` found anb return $VARNAME */
export function removeVariableDeclaration(config: FixAmdTslibConfig): FixAmdTslibResult {
  const result: FixAmdTslibResult = {
    errors: [],
    outputCode: undefined,
    variableName: undefined
  }
  const project = new Project();
  const sourceFile = project.createSourceFile('input.js', config.inputCode)
  if (config.formatJsOutput) {
    sourceFile.formatText()
  }
  const callExpression = sourceFile.getFirstDescendant(node =>
    TypeGuards.isCallExpression(node) &&
    node.getText() === `require("tslib")`) as CallExpression

  if (!callExpression) {
    // this means the file is not using any helper / feature
    return {
      ...result,
      outputCode: sourceFile.getText()
    }
  }

  const variableDeclaration = callExpression.getFirstAncestorByKind(SyntaxKind.VariableDeclaration)
  if (!variableDeclaration) {
    return { ...result, errors: ['require("tslib") call expression found but not in a VariableDeclaration'] }
  }
  const variableName = variableDeclaration.getName()

  const variableDeclarationStatement = variableDeclaration.getFirstAncestorByKind(SyntaxKind.VariableStatement)
  if (!variableDeclarationStatement) {
    return { ...result, errors: ['require("tslib") call expression found but not in a VariableStatement '] }
  }
  const parent = variableDeclarationStatement.getParent()
  if (!TypeGuards.isSourceFile(parent)) {
    return { ...result, errors: ['require("tslib") VariableStatement found but is not direct child of SourceFile'] }
  }
  parent.removeStatement(variableDeclarationStatement.getChildIndex())

  return {
    ...result,
    variableName,
    outputCode: parent.getText()
  }
}

