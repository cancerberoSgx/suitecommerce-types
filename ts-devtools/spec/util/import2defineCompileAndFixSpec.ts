import { rm, test } from "shelljs";
import { AllConfig, import2defineCompileAndFix } from "../../src";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";
import { readFileSync } from "fs";
import { printTimes } from "../../src/util/timeLog";

describe('import2defineCompileAndFixSpec', () => {

  it(' ../samples/projectMine should add tslib in all files using helpers', async done => {
    const config: AllConfig = {
      outputFolder: getPathRelativeToProjectFolder('./tmp/samples-projectMineOut'),
      tsconfigFilePath: getPathRelativeToProjectFolder('../sample-projects/projectMine/tsconfig.json'),
      // debug: true,
    }
    rm('-rf', config.outputFolder)
    const result = import2defineCompileAndFix(config)
    expect(result.errors).toEqual([])
    result.emittedFileNames
      .forEach(f => expect(readFileSync(f).toString()).toContain(`, "tslib"], function (`))
    expect(test('-f', `${config.outputFolder}/src/tslib.js`)).toBe(true)

    done()
  })
  
  //TODO: projectMine is broken will fail with Sorry you can only have one export for a non interface/type declaration . TODO: move this test to import2defineOneSpec since the job is there. 
  xit('projectMine should add tslib in all files using helpers', () => {
    const config: AllConfig = {
      outputFolder: getPathRelativeToProjectFolder('tmp/projectMineOut'),
      tsconfigFilePath: getPathRelativeToProjectFolder('spec/fixtures/projectMine/tsconfig.json'),
      // debug: true
    }
    rm('-rf', config.outputFolder)
    const result = import2defineCompileAndFix(config)
    expect(result.errors.length>0).toBe(true)//find(e => e.includes('Sorry you can only have one export for a non interface/type declaration'))).toBeDefined()
  })

  
})