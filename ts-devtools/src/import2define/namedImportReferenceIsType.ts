import Project, { ImportDeclaration, SourceFile, ScriptTarget, ts } from "ts-simple-ast";
import { dirname, resolve } from "path";

/** return true if in given import declaration the given named import name references a type and not a value.  */
export function namedImportReferenceIsType(id: ImportDeclaration, ni: string): boolean {
  const sourceFile = id.getSourceFile();
  let targetSourceFile = id.getModuleSpecifierSourceFile();
  if (!targetSourceFile) {
    const targetPath = resolve(dirname(sourceFile.getFilePath()) + '/' + id.getModuleSpecifierValue() + '.ts');
    const memory = sourceFileMemory.find(f => f.filePath === targetPath);
    if (!memory) {
      return handleBadProject(id)
    }
    targetSourceFile = sourceFileMemoryProject.getSourceFile(targetPath) || sourceFileMemoryProject.createSourceFile(targetPath, memory.content);
  }
  if (!targetSourceFile) {
    // TODO: debug, error, why?, should not because if !id.getModuleSpecifierSourceFile() it means the file was already processed should be on memory...
    // throw new Error('Cannot build a target source file');
    return handleBadProject(id)
  }
  const s = targetSourceFile.getExportSymbols().find(s => s.getName() === ni);
  if (!s) {
    return handleBadProject(id)
  }
  return !s.getValueDeclaration();
}

/** this should not happen. It happens when importing a non existing file or library. in the case of library we want not to include it as AMD dependency, if relative and not found we include it as amd dependency - a test - compilation failing in source project*/
function handleBadProject(id: ImportDeclaration) {
  if (id.isModuleSpecifierRelative()) {
    return false
  }
  else {
    return false;
  }
}

// need to remember the sourceFile's content because we will be modifying them and we will lost data
let sourceFileMemory: {
  filePath: string;
  content: string;
}[] = [];
let sourceFileMemoryProject: Project;
export function memorizeSourceFile(sourceFile: SourceFile) {
  if (!sourceFileMemoryProject) {
    sourceFileMemoryProject = new Project({
      compilerOptions: {
        target: ScriptTarget.ES2018,
        module: ts.ModuleKind.CommonJS,
        lib: [
          "es2018"
        ]
      },
      useVirtualFileSystem: true
    });
  }
  sourceFileMemory.push({ filePath: sourceFile.getFilePath(), content: sourceFile.getText() });
}

export function _namedImportReferenceIsTypeReset() {
  sourceFileMemory = [];
  sourceFileMemoryProject = null;
}
