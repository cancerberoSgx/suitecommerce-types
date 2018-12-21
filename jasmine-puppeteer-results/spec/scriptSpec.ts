import { join } from "path";
import { launch } from 'puppeteer';
import { loadScriptBrowser } from "../src/script";
import { staticServer } from "./staticServer";

describe('script', () => {

  describe('loadScriptBrowser', () => {
    it('works', async done => {
      const server = await staticServer(join(__dirname, 'fixtures', 'static1'), 9999)
      const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.goto('http://localhost:9999/index.html')
      expect(await page.title()).toBe('static content 1')
      expect(await page.evaluate((g)=>window[g]||'undefined', 'My_Global123')).toBe('undefined')
      expect(await page.evaluate(loadScriptBrowser, 'unicorns.js')).toBe(false)
      expect(await page.evaluate(loadScriptBrowser, 'test.js')).toBe(true)
      expect(await page.evaluate((g)=>window[g]||'undefined', 'My_Global123')).toBe('hello')
      await browser.close();
      server.close(done)
    })
  })
})


