import { FixAmdTslibConfig, FixAmdTslibResult } from "./types";
import { removeVariableDeclaration } from "./removeVariableDeclaration";
import { addTslibAmdDependency } from "./addTslibAmdDependency";

export function fixJsFileAmdTslib(config: FixAmdTslibConfig): FixAmdTslibResult {
  const result1 = removeVariableDeclaration(config)
  if (result1.errors.length) {
    return result1
  }

  // console.log(`
  
  // ${JSON.stringify({config, result1}, null, 2)}
  
  // `);
  
  const result2 = addTslibAmdDependency({ variableName: result1.variableName, inputCode: result1.outputCode })

  //TODO verify that the output code compiles wihtout errors
  return result2
}