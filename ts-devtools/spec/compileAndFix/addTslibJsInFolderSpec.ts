import { readFileSync } from "fs";
import { dirname, join } from "path";
import { cd, exec, pwd, rm, config } from "shelljs";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";

fdescribe('addTslibJsInFolder', () => {

  let cwd: string, tslibOutputFolder: string, p: any
  
  beforeAll(() => {
    cwd = pwd()
    const outputFolder = getPathRelativeToProjectFolder('tmp/using-sc-types-frontend-extras')
    const tsconfigFilePath = getPathRelativeToProjectFolder(`spec/fixtures/using-sc-types-frontend-extras/tsconfig.json`)
    tslibOutputFolder = getPathRelativeToProjectFolder('tmp/using-sc-types-frontend-extras-tslib')
    rm('-rf', outputFolder)
    rm('-rf', tslibOutputFolder)
    cd(dirname(tsconfigFilePath))
    config.silent=false
    p = exec(`npx sc-tsc --tsconfigFilePath ./tsconfig.json --outputFolder ${outputFolder} --addTslibJsInFolder ${tslibOutputFolder} --debug`)
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
    expect(readFileSync(join(tslibOutputFolder, 'ReactLike.js')).toString()).toContain(`define('ReactLike'`)
    expect(readFileSync(join(tslibOutputFolder, 'JSXView.js')).toString()).toContain(`define('JSXView'`)
  })

})