import * as puppeteer from 'puppeteer'
import { staticServer } from '../../../staticServer';
import { join } from 'path';
import { ok } from 'assert';

(async () => {
  const server = await staticServer(join(__dirname, '../static1', 'static1'), 9998)
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:9998/index.html');
  ok((await page.title()) === 'static content 1')
  await page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });
  await page.evaluate(() => () =>console.log('test with P'))
  await browser.close()
  server.close(()=>console.log('end'))
})();