
export interface Config {
  inputCode: string
  variableName?: string
  tslibDependencyName?: string
}
export interface Result {
  errors: string[]
  outputCode: string
  variableName?: string
}