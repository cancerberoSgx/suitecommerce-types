import {Project, Diagnostic, Node, SourceFile, SyntaxKind} from 'ts-simple-ast'
import {getPreviousMatchingPos, changeText} from 'misc-utils-of-mine'

export interface Config {
  tsConfigFilePath?: string
  project?: Project
  debug?: boolean
}

export function fixProjectErrors(config:Config) {
  const project = config.tsConfigFilePath  ? new Project({
    tsConfigFilePath: config.tsConfigFilePath, 
    addFilesFromTsConfig: true
  }) : config.project

  if(!project){
    throw new Error('No project not tsConfigFilePath given, aborting. ')
  }

  project.getSourceFiles().forEach(f=>{
    if(config.debug){
      console.log('Fixing errors of '+f.getBaseName())
    }
    fixSourceFileErrors(f)
  })
  project.saveSync()
}

export function fixSourceFileErrors(f: SourceFile) {
  const changes = []
  const s = f.getFullText()
  const diagnostics = f.getPreEmitDiagnostics()
  diagnostics.forEach(d=>{
    let pos = getPreviousMatchingPos(s, d.getStart(), '\n')
    let toAdd = `\n${comment}`
    const descendant = f.getDescendantAtPos(d.getStart())
    const templateSpanAncestor = descendant && descendant.getFirstAncestorByKind(SyntaxKind.TemplateSpan)
    if(templateSpanAncestor) {
      pos = templateSpanAncestor.getStart()
      toAdd = `\n${comment}\n`
      // return // this is working but I'm so afraid
    }
    changes.push({pos, toAdd})
  })
  // debugger
  if(diagnostics.length){
    const newText = changeText(s, changes)
    f.replaceWithText(newText)
  }
}
const comment = `//@ts-ignore`