import {Project, Diagnostic, Node, SourceFile, SyntaxKind} from 'ts-simple-ast'
import {getPreviousMatchingPos, changeText} from 'misc-utils-of-mine'

export interface Config {
  tsConfigFilePath: string
}

export function fixProjectErrors(config:Config) {
  const project = new Project({
    tsConfigFilePath: config.tsConfigFilePath, 
    addFilesFromTsConfig: true
  })
  project.getSourceFiles().forEach(f=>{
    fixSourceFileErrors(f)
  })
  project.saveSync()
}

export function fixSourceFileErrors(f: SourceFile) {
  const changes = []
  const s = f.getFullText()
  f.getPreEmitDiagnostics().forEach(d=>{
    let pos = getPreviousMatchingPos(s, d.getStart(), '\n')
    let toAdd = `\n${comment}`
    const templateSpanAncestor = f.getDescendantAtPos(d.getStart()).getFirstAncestorByKind(SyntaxKind.TemplateSpan)
    if(templateSpanAncestor) {
      pos = templateSpanAncestor.getStart()
      toAdd = `\n${comment}\n`
      // return // this is working but I'm so afraid
    }
    changes.push({pos, toAdd})
  })
  debugger
  const newText = changeText(s, changes)
  f.replaceWithText(newText)
}
const comment = `//@ts-ignore`