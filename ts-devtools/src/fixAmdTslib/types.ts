
export interface FixAmdTslibConfig {
  inputCode: string
  variableName?: string
  tslibDependencyName?: string,
  formatJsOuptut?: boolean
}
export interface FixAmdTslibResult {
  errors: string[]
  outputCode: string
  variableName?: string
}