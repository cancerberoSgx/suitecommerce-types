import { rm, test } from "shelljs";
import { AllConfig, import2defineCompileAndFix } from "../../src";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";
import { readFileSync, appendFileSync } from "fs";
import { join, basename } from "path";

describe('startWatch', () => {

  it(' ../samples/projectMine should listen for file changes if watch: true', async done => {
    const config: AllConfig = {
      outputFolder: getPathRelativeToProjectFolder('./tmp/projectMineWatch'),
      tsconfigFilePath: getPathRelativeToProjectFolder('../sample-projects/projectMine/tsconfig.json'),
      watch: true,
      // debug: false,
      watchListener: event => {
        if (event.event === 'change') {
          expect(event.fileName).toBe(basename(toChange))
          done()
        }
        if (event.event === 'afterRegister') {
          setTimeout(() => {
            appendFileSync(toChange, '\n; console.log(\'end\'); \n')
          }, 10);
        }
      },
    }
    const toChange = join(config.tsconfigFilePath, '..', 'src', 'Mine.ts')
    rm('-rf', config.outputFolder)
    const result = import2defineCompileAndFix(config)
    result.emittedFileNames
      .forEach(f => expect(readFileSync(f).toString()).toContain(`, "tslib"], function (`))
    expect(result.errors).toEqual([])
    expect(test('-f', `${config.outputFolder}/src/tslib.js`)).toBe(true)
  })

  xit(' config.watchListener return true should stop watching', async done => {
    done()
  })

  xit('should not stop on compilation errors', async done => {
    done()
  })
})