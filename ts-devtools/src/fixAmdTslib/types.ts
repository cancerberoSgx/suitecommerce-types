export interface FixAmdTslibConfig {
  inputCode: string
  variableName?: string
  tslibDependencyName?: string
  formatJsOutput?: boolean
  addExtraAmdDependendenciesForSCAUnitTests?: string
  debug?: boolean
}
export interface FixAmdTslibResult {
  errors: string[]
  outputCode: string
  variableName?: string
}