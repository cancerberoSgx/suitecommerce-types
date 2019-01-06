
export interface FixAmdTslibConfig {
  inputCode: string
  variableName?: string
  tslibDependencyName?: string
  formatJsOutput?: boolean
}
export interface FixAmdTslibResult {
  errors: string[]
  outputCode: string
  variableName?: string
}