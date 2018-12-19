import { Project, Diagnostic, Node, SourceFile, SyntaxKind } from 'ts-simple-ast'
import { getPreviousMatchingPos, changeText } from 'misc-utils-of-mine'

export interface Config {
  tsConfigFilePath?: string
  project?: Project
  debug?: boolean
  dontSave?: boolean
}
export interface Result{
  project: Project
}
export function fixProjectErrors(config: Config): Result {
  const project = config.tsConfigFilePath ? new Project({
    tsConfigFilePath: config.tsConfigFilePath,
    addFilesFromTsConfig: true
  }) : config.project
  if (!project) {
    throw new Error('No project not tsConfigFilePath given, aborting. ')
  }
  project.getSourceFiles().forEach(sourceFile => {
    if (config.debug) {
      console.log('Fixing errors of ' + sourceFile.getBaseName())
    }
    fixSourceFileErrors({sourceFile, project})
  })
  if(!config.dontSave){
    project.saveSync()
  }
  return {project}
}

export function fixSourceFileErrors(config:{sourceFile: SourceFile, project: Project}) {
  const changes: { pos: number, toAdd: string }[] = []
  const s = config.sourceFile.getFullText()
  const diagnostics = config.sourceFile.getPreEmitDiagnostics()
  diagnostics.forEach(d => {
    const start = d.getStart()
    if(start===undefined){
      console.log('WARNING ignoring diagnostic with undefined start :', config.project.formatDiagnosticsWithColorAndContext([d]));
      return
    }
    let pos = getPreviousMatchingPos(s, start, '\n')
    let toAdd = `\n${comment}`
    const descendant = config.sourceFile.getDescendantAtPos(start)
    const templateSpanAncestor = descendant && descendant.getFirstAncestorByKind(SyntaxKind.TemplateSpan)
    if (templateSpanAncestor) {
      pos = templateSpanAncestor.getStart()
      toAdd = `\n${comment}\n`
      // TODO: review and test more
    }
    changes.push({ pos, toAdd })
  })
  if (diagnostics.length) {
    const newText = changeText(s, changes)
    config.sourceFile.replaceWithText(newText)
  }
}
const comment = `//@ts-ignore`