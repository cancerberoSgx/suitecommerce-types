import { Project } from 'ts-simple-ast';
import { fixProjectSourceFileErrors } from './fixSourceFileErrors';
import { Config, Result } from './index';

export function fixProjectErrors(config: Partial<Config>): Result {
  const project = loadProject(config);
  project.getSourceFiles().forEach(sourceFile => {
    if (config.debug) {
      console.log('Fixing errors of ' + sourceFile.getBaseName());
    }
    fixProjectSourceFileErrors({ sourceFile, project });
  });
  if (!config.dontSave) {
    project.saveSync();
  }
  return { project };
}

export function loadProject(config: Partial<Config>) {
  const project = config.project ? config.project : config.tsConfigFilePath ? new Project({
    tsConfigFilePath: config.tsConfigFilePath,
    addFilesFromTsConfig: true
  }) : new Project({useVirtualFileSystem: true}) ;
  if (!project) {
    throw new Error(`The project at ${config.tsConfigFilePath} couldn't be loaded, aborting. `);
  }
  return project;
}

