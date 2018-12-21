import { Page, launch } from 'puppeteer';
import { notEqual } from 'assert';
import { linkDependencies } from './installation';
import { resolve, join, sep } from 'path';

export interface JasmineResult {
  failed: boolean
  /** internal errors in the scrapper tool while trying to extract information from the jasmine html report */
  internalErrors: string[]
  /** something like 16 specs, 2 failures, 2 pending specs */
  barMessage: string
}
export async function waitForJasmine(page: Page, globalName = 'jQuery', ms = 300, timeout = 2000): Promise<JasmineResult> {

  await page.waitFor('.jasmine_html-reporter .results')
  await page.waitFor('.jasmine_html-reporter .alert .bar')

  const passed = await page.evaluate(() => document.querySelectorAll('.jasmine_html-reporter .alert .bar.passed').length > 0)
  const failed = await page.evaluate(() => document.querySelectorAll('.jasmine_html-reporter .alert .bar.failed').length > 0)

  const barMessage = await page.evaluate(() => document.querySelector('.jasmine_html-reporter .alert .bar').innerHTML)
  const errors: string[] = []
  if (passed && failed) {
    errors.push('success and failure selectors are equal')
    notEqual(passed, failed, 'success and failure selectors are equal')
  }
  return {
    failed,
    barMessage,
    internalErrors: errors
  }
}
export interface AbstractConfig {
  /** help info for CLI */
  help?: boolean
  debug?: boolean, 
  onConsoleLog? : (s:string)=>void, 
  consoleLog?: boolean
  screenshot?: string
  /** specify another project where puppeteer is installed so it's not downloaded each time. For example, if you know the project ../foo/bar has puppeteer installed, this is, the folder ../foo/bar/node_modules/puppeteer exists then use --puppeteerNodeModulesPath ../foo/bar */
  puppeteerNodeModulesPath?: string
}
export interface GetJasmineHtmlResultsConfig extends AbstractConfig{
  jasmineHtmlServerUrl: string, 
}
export async function getJasmineHtmlResults(config: GetJasmineHtmlResultsConfig) : Promise<JasmineResult>{
  
  const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  config.debug && console.log(`getJasmineHtmlResults browser launched`);
  const page = await browser.newPage();
  await page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i){
      config.onConsoleLog  && config.onConsoleLog(`${msg.args()[i]}`);
      (config.debug || config.consoleLog) && console.log('console.log: '+`${msg.args()[i]}`);
    }
  })
  config.debug && console.log(`getJasmineHtmlResults page created`);
  await page.goto(config.jasmineHtmlServerUrl)
  config.debug && console.log(`getJasmineHtmlResults waiting for navigation on url ${config.jasmineHtmlServerUrl}`);
  await page.waitForNavigation()
  config.screenshot && await page.screenshot({path: config.screenshot})
  const result = await waitForJasmine(page)
  await browser.close()
  return result
}
