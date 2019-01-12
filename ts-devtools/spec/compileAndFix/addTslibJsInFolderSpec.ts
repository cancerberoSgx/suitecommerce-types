import { dirname } from "path";
import { cat, cd, exec, pwd, rm } from "shelljs";
import { getPathRelativeToProjectFolder } from "../../src/util/misc";

describe('addTslibJsInFolder', () => {

  let cwd: string, tslib: string
  
  beforeAll(() => {
    cwd = pwd()
    const outputFolder = getPathRelativeToProjectFolder('tmp/using-sc-types-frontend-extras')
    const tsconfigFilePath = getPathRelativeToProjectFolder(`spec/fixtures/using-sc-types-frontend-extras/tsconfig.json`)
    rm('-rf', outputFolder)
    cd(dirname(tsconfigFilePath))
    const p = exec(`npx sc-tsc --tsconfigFilePath ./tsconfig.json --outputFolder ${outputFolder}`)
    expect(p.code).toBe(0)
    tslib = cat(`${outputFolder}/src/tslib.js`).toString()
  })

  afterAll(() => {
    cd(cwd)
  })

  it('Should add extra modules', () => {
    expect(tslib).toContain(`define('Backbone.Collection'`)
    expect(tslib).toContain(`define('Backbone.Router'`)
  })

  it('Should add sc-types-frontend-extras modules', () => {
    expect(tslib).toContain(`define('ReactLike'`)
    expect(tslib).toContain(`define('JSXView'`)
  })

})