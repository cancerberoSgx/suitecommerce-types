import { ImportDeclaration } from "ts-simple-ast";
import { CustomImportSpecifier } from "./import2define";
export const import2defineDefaults = 0;
export const defaultCustomImportSpecifiers: CustomImportSpecifier[] = [
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'suitecommerce',
    getImportSpecifier: (id: ImportDeclaration, ni: string) => ni
  },
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText().endsWith('.tpl'),
    getImportSpecifier: (id: ImportDeclaration, ni: string) => {
      const name = id.getModuleSpecifier().getLiteralText();
      return name.substring(name.lastIndexOf('/') + 1, name.length);
    }
  }
];
export const defaultIgnoreImportSpecifiers = [
  {
    predicate: (id: ImportDeclaration) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend'
  }
];
