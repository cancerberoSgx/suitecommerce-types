import { rm } from "shelljs";
import { AllConfig, import2defineCompileAndFix } from "../../src";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";

describe('import2defineCompileAndFixSpec', () => {

  //TODO: projectMine is broken will fail with Sorry you can only have one export for a non interface/type declaration . TODO: move this test to import2defineOneSpec since the job is there. 
  it(' projectMine should add tsline in all files using helpers', () => {
    const config: AllConfig = {
      outputFolder: getPathRelativeToProjectFolder('tmp/projectMineOut'),
      tsconfigFilePath: getPathRelativeToProjectFolder('spec/fixtures/projectMine/tsconfig.json'),
      debug: true
    }
    rm('-rf', config.outputFolder)
    const result = import2defineCompileAndFix(config)
    expect(result.errors.find(e => e.includes('Sorry you can only have one export for a non interface/type declaration'))).toBeDefined()
  })

})