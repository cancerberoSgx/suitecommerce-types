fixes all errors in given ts project by adding `//@ts-ignore` comments on all statements that have errors. 

Used by ../ts-devtools to make sure generated .ts files from import2define() don't have compilation errors. 


Example using `fixProjectErrors()`: 

```ts
import { fixProjectErrors } from "../src";
fixProjectErrors({tsConfigFilePath: 'my/project/tsconfig.json'})
```

Example using `fixSourceFileErrors()`: 

```ts
import { Project, SourceFile } from "ts-simple-ast";
import { fixSourceFileErrors } from "../src";
const fileName = 'test1.ts'
const p = new Project({compilerOptions:{strict: true, allowJs: true, checkJs: true, outDir: 'dist', removeComments: false}})
p.createSourceFile(fileName, `export function f(Something: any): void {
  return new Something<string>(2).fill(0).join(',')
}`)
expect(p.getSourceFile(fileName).getPreEmitDiagnostics().length).toBeGreaterThan(0)
fixSourceFileErrors(p.getSourceFile(fileName))
expect(p.getSourceFile(fileName).getPreEmitDiagnostics().length).toBe(0)
```