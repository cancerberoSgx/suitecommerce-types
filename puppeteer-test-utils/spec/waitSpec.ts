import { linkDependencies } from "../src/installation";
import { config } from "./config";
import { launch } from 'puppeteer'
import { createServer, ServerResponse, Server } from "http";
import { createReadStream } from "fs";
import { join } from "path";
import { IncomingMessage, OutgoingMessage } from "http";

describe('wait', () => {

  describe('waitForGlobalLocal', () => {
    it('works', async done => {
      await staticServer(join(__dirname, 'fixtures', 'static1'), 9999)

      const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.goto('http://localhost:9999/index.html')
      expect(await page.title()).toBe('static content 1')
      await page.evaluate(()=>{
        
      })
      await page.url()
      // page.evaluate(()=>{}, 
      await page.goto('http://localhost:7777/test1.html');
      done()
    })

  })

})

export async function staticServer(basePath: string, port = 999): Promise<Server> {
  return await createServer((req: IncomingMessage, res: ServerResponse) => {
    var stream = createReadStream(join(basePath, req.url))
    stream.on('error', function () {
      res.writeHead(404);
      res.end();
    });
    stream.pipe(res);
  }).listen(9999);
} 
