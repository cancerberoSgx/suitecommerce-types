import { readFileSync } from "fs";
import { dirname, join } from "path";
import { cd, exec, pwd, rm, config, ls } from "shelljs";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";

describe('addTslibJsInFolder', () => {

  fdescribe('--addTslibJsInFolder cli', () => {
    
    let cwd: string, tslibOutputFolder: string, p: any, outputFolder: string, files: string[]

    beforeAll(() => {
      cwd = pwd()
      outputFolder = getPathRelativeToProjectFolder('tmp/using-sc-types-frontend-extras')
      const tsconfigFilePath = getPathRelativeToProjectFolder(`spec/fixtures/using-sc-types-frontend-extras/tsconfig.json`)
      tslibOutputFolder = getPathRelativeToProjectFolder('tmp/using-sc-types-frontend-extras-tslib')
      rm('-rf', outputFolder)
      rm('-rf', tslibOutputFolder)
      cd(dirname(tsconfigFilePath))
      config.silent=false
      const cmd = `npx sc-tsc --tsconfigFilePath ./tsconfig.json --outputFolder ${outputFolder} --addTslibJsInFolder ${tslibOutputFolder} --debug`
      p = exec(cmd)
      files = ls('-R', tslibOutputFolder)
    })

    afterAll(() => {
      cd(cwd)
    })

    it('Should not throw errors', () => {
      expect(p.code).toBe(0)
    })

    it('Should add tslib.js', () => {
      expect(readFileSync(join(tslibOutputFolder, 'tslib.js')).toString()).toBeDefined()
    })

    it('Should add extra modules', () => {
      expect(readFileSync(join(tslibOutputFolder, 'Backbone.Collection.js')).toString()).toContain(`define('Backbone.Collection'`)
      expect(readFileSync(join(tslibOutputFolder, 'Backbone.Router.js')).toString()).toContain(`define('Backbone.Router'`)
    })

    it('Should add sc-types-frontend-extras modules', () => {
      // files.find(f=>f.endsWith('ReactLike.js'))
      expect(readFileSync(join(tslibOutputFolder, files.find(f=>f.endsWith('ReactLike.js')))).toString()).toContain(`define('ReactLike'`)
      expect(readFileSync(join(tslibOutputFolder, files.find(f=>f.endsWith('jsx/JSXView.js')))).toString()).toContain(`define('JSXView'`)
    })

    it('should handle sc-types-frontend types correctly', ()=>{
      const f = `${outputFolder}_ts/src/JavaScript/test-extras.ts`
      const content = readFileSync(f).toString()
      expect(content).toContain(`define('test-extras', ['JSXView', 'Backbone.Model', 'Backbone.View']`)
      expect(content.replace(/\s+/gm, '')).not.toContain(`import{JSXView}`)
    })

  })
})