
export interface FixAmdTslibConfig {
  inputCode: string
  variableName?: string
  tslibDependencyName?: string
}
export interface FixAmdTslibResult {
  errors: string[]
  outputCode: string
  variableName?: string
}