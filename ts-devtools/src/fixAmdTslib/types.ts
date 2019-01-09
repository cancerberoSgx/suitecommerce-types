export interface FixAmdTslibConfig {
  inputCode: string
  variableName?: string
  tslibDependencyName?: string
  formatJsOutput?: boolean
  addExtraAmdDependendenciesForSCAUnitTests?: boolean
  debug?: boolean
}
export interface FixAmdTslibResult {
  errors: string[]
  outputCode: string
  variableName?: string
}