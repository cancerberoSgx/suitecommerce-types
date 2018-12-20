import { join } from "path";
import { launch } from 'puppeteer';
import { loadScriptBrowser } from "../src/script";
import { staticServer } from "./staticServer";
import { waitForGlobalBrowser } from "../src/wait";

describe('wait', () => {

  describe('waitForGlobalBrowser', () => {
    
    it('works', async done => {
      const server = await staticServer(join(__dirname, 'fixtures', 'static1'), 9999)
      const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.goto('http://localhost:9999/index.html')
      
      expect(await page.evaluate((g)=>window['_test2_global_']||'undefined', 'My_Global123')).toBe('undefined')
      
      expect(await page.evaluate(()=>{
        setTimeout(() => {
          window['_test2_global_']='test2_global_123123'
        }, 200)
        return 'hello123'
      }, '_test2_global_', 50)).toBe('hello123')
      
      expect(await page.evaluate(waitForGlobalBrowser, '_test2_global_', 50)).toBe(true)
      expect(await page.evaluate((g)=>window['_test2_global_']||'undefined', 'My_Global123')).toBe('test2_global_123123')

      await browser.close();
      server.close(done)
      // expect(server.emit('close')).toBe(true)
      done()
    })
  })
  
})


