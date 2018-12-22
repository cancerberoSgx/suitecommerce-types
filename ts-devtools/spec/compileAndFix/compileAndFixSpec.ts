import { addTslibAmdDependency } from "../../src/fixAmdTslib/addTslibAmdDependency";
import { compileAndFix } from "../../src/compileAndFix/compileAndFix";
import { rm } from "shelljs";

describe('compileAndFix', () => {
    fit('basic', () => {
        const outputFolder = './dist/testdist'
        rm('-rf', outputFolder)
        const tsconfigJsonPath=`../sample-projects/frontend-simple1/tsconfig.json` //: './tsconfig.json'
        const result = compileAndFix({ outputFolder, tsconfigJsonPath, breakOnFirstError: true })

        console.log('\n\n', JSON.stringify(result, null, 2) );
    })
})