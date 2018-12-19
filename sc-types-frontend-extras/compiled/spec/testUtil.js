"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_simple_ast_1 = require("ts-simple-ast");
function expectCodeEquals(a, b) {
    // console.log(a, b);
    if (!a || !b)
        return false;
    expect(a.replace(/\s+/gm, ' ').trim()).toEqual(b.replace(/\s+/gm, ' ').trim());
}
exports.expectCodeEquals = expectCodeEquals;
function expectCodeToContain(a, b) {
    // console.log(a, b);
    if (!a || !b)
        return false;
    expect(a.replace(/\s+/gm, ' ').trim()).toContain(b.replace(/\s+/gm, ' ').trim());
}
exports.expectCodeToContain = expectCodeToContain;
function expectCodeNotToContain(a, b) {
    // console.log(a, b);
    if (!a || !b)
        return false;
    expect(a.replace(/\s+/gm, ' ').trim()).not.toContain(b.replace(/\s+/gm, ' ').trim());
}
exports.expectCodeNotToContain = expectCodeNotToContain;
var project;
var sourceFile;
function compile(code) {
    if (!project) {
        project = new ts_simple_ast_1.Project({ tsConfigFilePath: './tsconfig.json' });
    }
    if (!sourceFile) {
        sourceFile = project.createSourceFile("./src/_expectCompile_tmp_" + Date.now() + ".ts", code);
    }
    else {
        sourceFile.replaceWithText(code);
    }
    var diagnostics = sourceFile.getPreEmitDiagnostics();
    var diagnosticMessages = ''; //= diagnostics.map(d=>{
    //   const s = d.getMessageText()
    //   if((s as any).getMessageText){
    //     return (s as any).getMessageText()
    //   }else {
    //     return d
    //   }
    // }).join('\n')
    // console.log(diagnosticMessages);
    var diagnosticFormatted = project.formatDiagnosticsWithColorAndContext(diagnostics);
    return { diagnostics: diagnostics, diagnosticFormatted: diagnosticFormatted, sourceFile: sourceFile, diagnosticMessages: diagnosticMessages };
}
exports.compile = compile;
function expectCompile(config) {
    function test() {
        var _a = compile(config.code), diagnosticMessages = _a.diagnosticMessages, diagnosticFormatted = _a.diagnosticFormatted, sourceFile = _a.sourceFile;
        if (config.expectSuccess) {
            expect(diagnosticFormatted).toBeFalsy();
        }
        else {
            expect(diagnosticFormatted).toBeTruthy();
        }
        if (config.expectErrorMsgToContain) {
            expect(diagnosticFormatted).toContain(config.expectErrorMsgToContain);
        }
        if (config.emittedCodeToContain || config.emittedCodeNotToContain) {
            var o = sourceFile.getEmitOutput().getOutputFiles().map(function (f) { return f.getText(); }).join('\n');
            expectCodeToContain(o, config.emittedCodeToContain);
            expectCodeNotToContain(o, config.emittedCodeNotToContain);
        }
    }
    if (config.it) {
        it(config.it, function () { return test(); });
    }
    else if (config.fit) {
        fit(config.fit, function () { return test(); });
    }
    else {
        test();
    }
}
exports.expectCompile = expectCompile;
function expectCompileSuccess(config) {
    expectCompile(tslib_1.__assign({}, config, { expectSuccess: true }));
}
exports.expectCompileSuccess = expectCompileSuccess;
function expectCompileFail(config) {
    expectCompile(tslib_1.__assign({}, config, { expectSuccess: false }));
}
exports.expectCompileFail = expectCompileFail;
