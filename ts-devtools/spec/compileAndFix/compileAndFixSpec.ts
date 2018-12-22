import { addTslibAmdDependency } from "../../src/fixAmdTslib/addTslibAmdDependency";
import { compileAndFix } from "../../src/compileAndFix/compileAndFix";
import { rm } from "shelljs";

describe('compileANDFIX', () => {
    fit('basic', () => {
        const outputFolder='./dist/testdist'
        rm('-rf', outputFolder)
        compileAndFix({outputFolder,tsconfigJsonPath:'./tsconfig.json'})
    })
})