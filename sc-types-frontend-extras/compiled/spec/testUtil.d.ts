import { Diagnostic, SourceFile } from 'ts-simple-ast';
export declare function expectCodeEquals(a?: string, b?: string): false | undefined;
export declare function expectCodeToContain(a?: string, b?: string): false | undefined;
export declare function expectCodeNotToContain(a?: string, b?: string): false | undefined;
export declare function compile(code: string): {
    diagnostics: Diagnostic[];
    diagnosticFormatted: string;
    sourceFile: SourceFile;
    diagnosticMessages: string;
};
interface ExpectCompileConfig {
    code: string;
    expectSuccess?: boolean;
    /** wraps the test in an synch it() using it as description */
    it?: string;
    fit?: string;
    expectErrorMsgToContain?: string;
    emittedCodeToContain?: string;
    emittedCodeNotToContain?: string;
}
export declare function expectCompile(config: ExpectCompileConfig): void;
export declare function expectCompileSuccess(config: ExpectCompileConfig): void;
export declare function expectCompileFail(config: ExpectCompileConfig): void;
export {};
