// import { join } from "path";
// import { launch } from 'puppeteer';
// import { waitForGlobalBrowser, waitForElementBrowser, waitForGlobal } from "../src/wait";
// import { staticServer } from "./staticServer";

// describe('wait', () => {
  
//   fit('waitForElementBrowser', async done => {
//     // const server = await staticServer(join(__dirname, 'fixtures', 'static1'), 9999)
//     const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     const page = await browser.newPage();
//     // await page.goto('http://localhost:9999/index.html')

//     await page.on('console', msg => {
//       for (let i = 0; i < msg.args().length; ++i)
//         console.log(`${i}: ${msg.args()[i]}`);
//     });

//     await page.goto('http://localhost:7777/test1.html#page/2')

//     // await page.evaluate(()=>console.log('sebbbb'+(typeof window)))
//     done()
//     // console.log('asd');
    
//     // await waitForGlobal(page, 'jfjf')
//     expect(await waitForGlobal(page, 'jfjf')).toBe(true)
//     // await page.evaluate(() => {
//     //   setTimeout(() => 
//     //     document.body.innerHTML='<div class=".foo33">hello world</div>'
//     //   , 200)
//     // })

//     // expect(await page.evaluate((g) => !!document.querySelector('.foo33'))).toBe(true)

//     await browser.close()
//     done()
//     // server.close(done)
//   })

//   it('waitForGlobalBrowser', async done => {
//     const server = await staticServer(join(__dirname, 'fixtures', 'static1'), 9999)
//     const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     const page = await browser.newPage();
//     await page.goto('http://localhost:9999/index.html')

//     expect(await page.evaluate((g) => window['_test2_global_'] || 'undefined', 'My_Global123')).toBe('undefined')

//     expect(await page.evaluate(() => {
//       setTimeout(() => {
//         window['_test2_global_'] = 'test2_global_123123'
//       }, 200)
//       return 'hello123'
//     }, '_test2_global_', 50)).toBe('hello123')

//     expect(await page.evaluate(waitForGlobalBrowser, '_test2_global_', 50)).toBe(true)
//     expect(await page.evaluate((g) => window['_test2_global_'] || 'undefined', 'My_Global123')).toBe('test2_global_123123')

//     await browser.close()
//     server.close(done)
//   })

// })


