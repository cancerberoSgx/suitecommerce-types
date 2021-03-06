import { FixAmdTslibConfig, FixAmdTslibResult } from "./types";
import { removeVariableDeclaration } from "./removeVariableDeclaration";
import { addTslibAmdDependency } from "./addTslibAmdDependency";

export function fixJsFileAmdTslib(config: FixAmdTslibConfig): FixAmdTslibResult {
  const result1 = removeVariableDeclaration(config)
  if (result1.errors.length) {
    return result1
  }
  const result2 = addTslibAmdDependency({ 
    variableName: result1.variableName, 
    inputCode: result1.outputCode, 
    formatJsOutput: config.formatJsOutput, 
    addExtraAmdDependendenciesForSCAUnitTests: config.addExtraAmdDependendenciesForSCAUnitTests,
    debug: config.debug
  })
  //TODO verify that the output code compiles without errors
  return result2
}