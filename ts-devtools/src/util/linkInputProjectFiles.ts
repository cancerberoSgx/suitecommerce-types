import { dirname, resolve } from "path";
import { mkdir, ln, ls, test } from "shelljs";
import { AbstractConfig } from "../compileAndFix/compileAndFix";

export function linkInputProjectFiles(config: AbstractConfig) {
  const tsConfigFolder = dirname(resolve(config.tsconfigFilePath));
  if (!config.skipLinkInputProjectFiles) {
    ln('-sf', `${tsConfigFolder}/node_modules`, `${config.outputFolder}/node_modules`);
    ls('-R', tsConfigFolder)
      .filter(f => !f.startsWith('node_modules') && !test('-e', `${config.outputFolder}/${f}`))
      .forEach(f => {
        mkdir('-p', `${config.outputFolder}/${dirname(f)}`);
        ln('-sf', `${tsConfigFolder}/${f}`, `${config.outputFolder}/${f}`);
      });
  }
}
