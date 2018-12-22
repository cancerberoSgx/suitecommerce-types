import { Project, Diagnostic, Node } from 'ts-simple-ast'

export interface Config {
  tsConfigFilePath: string
  /** for CLI only */
  sourceFilePath?: string
  project?: Project
  debug?: boolean
  dontSave?: boolean
  /** for CLI only */
  help?: boolean
}
export interface Result{
  project: Project
}

export * from './fixProjectErrors'
export * from './fixSourceFileErrors'