import { changeText, getPreviousMatchingPos } from 'misc-utils-of-mine';
import { Project, SourceFile, SyntaxKind } from 'ts-simple-ast';
import { Config } from '.';
import { loadProject } from './fixProjectErrors';
import { resolve } from 'path';

/** given a Project and SourceFile of it it will fix the file errors */
export function fixProjectSourceFileErrors(config: {
  sourceFile: SourceFile;
  project: Project;
}) {
  const changes: {
    pos: number;
    toAdd: string;
  }[] = [];
  const s = config.sourceFile.getFullText();
  const diagnostics = config.sourceFile.getPreEmitDiagnostics();
  diagnostics.forEach(d => {
    const start = d.getStart();
    if (start === undefined) {
      console.log('WARNING ignoring diagnostic with undefined start :', config.project.formatDiagnosticsWithColorAndContext([d]));
      return;
    }
    let pos = getPreviousMatchingPos(s, start, '\n');
    let toAdd = `\n${comment}`;
    const descendant = config.sourceFile.getDescendantAtPos(start);
    const templateSpanAncestor = descendant && descendant.getFirstAncestorByKind(SyntaxKind.TemplateSpan);
    if (templateSpanAncestor) {
      pos = templateSpanAncestor.getStart();
      toAdd = `\n${comment}\n`;
      // TODO: review and test more
    }
    changes.push({ pos, toAdd });
  });
  if (diagnostics.length) {
    const newText = changeText(s, changes);
    config.sourceFile.replaceWithText(newText);
  }
}

/** 
 * high level version of fixProjectSourceFileErrors. it will load the project and fix the sourcefile defined 
 * with tsConfigFilePath and sourceFilePath config 
 */
export function fixSourceFileErrors(config: Config) {
  if(!config.sourceFilePath){
    throw new Error(`No --sourceFilePath was given, aborting.`);
  }
  const project = loadProject(config)
  const path = resolve(config.sourceFilePath)
  const sourceFile = project.getSourceFiles().find(f=>resolve(f.getFilePath()) === path)
  if(!sourceFile){
    throw new Error(`The source file ${config.sourceFilePath} couldn't be found on project ${config.tsConfigFilePath},aborting.`);
  }
  return fixProjectSourceFileErrors({sourceFile, project})
}

const comment = `//@ts-ignore`