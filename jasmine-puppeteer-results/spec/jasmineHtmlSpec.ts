import { launch } from 'puppeteer';
import { waitForJasmine } from "../src/jasmineHtml";
// import { wait } from "../src/wait";

describe('waitForJasmine', () => {
  
  it('waitForJasmine', async done => {
    // const server = await staticServer(join(__dirname, 'fixtures', 'static1'), 9999)
    const browser = await launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    // await page.goto('http://localhost:9999/index.html')

    // await page.on('console', msg => {
    //   for (let i = 0; i < msg.args().length; ++i)
    //     console.log(`${i}: ${msg.args()[i]}`);
    // });

    const url = 'http://localhost:7777/test1.html'
    console.log({url});
    
    await page.goto(url)

    await page.waitForNavigation()
    // await wait(1000)

    await page.screenshot({path: './ssss.png', fullPage: true})
    const result = await waitForJasmine(page)

    console.log(result.barMessage)
    // expect(result.failed).toBe(true)
    // await page.evaluate(()=>console.log('sebbbb'+(typeof window)))
    // done()
    // console.log('asd');
    
    // await waitForGlobal(page, 'jfjf')
    // expect(await waitForGlobal(page, 'jfjf')).toBe(true)
    // await page.evaluate(() => {
    //   setTimeout(() => 
    //     document.body.innerHTML='<div class=".foo33">hello world</div>'
    //   , 200)
    // })

    // expect(await page.evaluate((g) => !!document.querySelector('.foo33'))).toBe(true)

    await browser.close()
    done()
    // server.close(done)
  })


})


