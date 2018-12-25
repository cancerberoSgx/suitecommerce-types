import * as ts_module from "../node_modules/typescript/lib/tsserverlibrary";
import { transformer } from "./transform";

function init(modules: { typescript: typeof ts_module }) {
  const ts = modules.typescript;
  function create(info: ts.server.PluginCreateInfo) {
    // info.project.projectService.logger.info(
    //   "I'm getting set up now! Check the log for this message."
    // );
    const proxy: ts.LanguageService = Object.create(null);
    for (let k of Object.keys(info.languageService) as Array<
      keyof ts.LanguageService
    >) {
      const x = info.languageService[k];
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
    }

    proxy.getEmitOutput = function getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean): ts_module.EmitOutput {
      const sourceFile = info.languageService.getProgram().getSourceFile(fileName)
      const printer: ts.Printer = ts.createPrinter();
      const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(
        sourceFile, [transformer]
      );
      const transformedSourceFile: ts.SourceFile = result.transformed[0];
      const newContent = printer.printFile(transformedSourceFile)
      result.dispose()

      return info.languageService.getEmitOutput(newContent, emitOnlyDtsFiles)
    }

    return proxy;
  }

  return { create };
}

export = init;