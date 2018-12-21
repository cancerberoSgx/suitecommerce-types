

import { rm, exec, test, cd, mv, pwd } from "shelljs";
import { linkDependencies } from "../src/installation";
import { join } from "path";
import { config } from "./config";

// // HACK: make sure this test didn't break the install in previous run
// mv('node_modules/puppeteer2', 'node_modules/puppeteer')


xdescribe('installation', ()=>{
  it('links', ()=>{
    rm('-rf', 'node_modules/puppeteer')
    expect(exec('npm i --offline').code).toBe(0)
    expect(test('-d', 'node_modules')).toBe(true)
    expect(test('-e', 'node_modules/puppeteer')).toBe(false)
    linkDependencies(config.nodeModulesWithP, 'node_modules')
    expect(test('-d', 'node_modules/puppeteer')).toBe(true)
  })

  it('realProjectRun', ()=>{
    mv('node_modules/puppeteer', 'node_modules/puppeteer2')
    const cwd = pwd()
    cd(join(__dirname, 'fixtures/project1'))
    rm('-rf', 'node_modules')
    expect(exec('npm i --offline').code).toBe(0)
    let p = exec('npx ts-node -T src/noPSimple')
    expect(p.code).toBe(0)
    expect(p.stdout).toContain('test without P')
    p = exec('npx ts-node src/pSimple')
    expect(p.code).not.toBe(0)
    linkDependencies(config.nodeModulesWithP, 'node_modules')
    p = exec('npx ts-node src/pSimple')
    expect(p.code).toBe(0)
    expect(p.stdout).toContain('test with P')
    cd(cwd)
    mv('node_modules/puppeteer2', 'node_modules/puppeteer')
  })

})