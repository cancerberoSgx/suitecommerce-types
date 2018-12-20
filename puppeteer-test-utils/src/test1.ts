import * as puppeteer from 'puppeteer'


(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const page = await browser.newPage();
  // page.evaluate(()=>{}, 
  await page.goto('http://localhost:7777/test1.html');
  await page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });
  await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
  await page.evaluate(() => (async () => {
    await wait(500)
    console.log('foo')
    await wait(500)
    console.log('foo')
    await wait(500)
    console.log('foo')
    function wait(ms) {
      return new Promise(r => {
        setTimeout(() => {
          r()
        }, ms);
      })
    }
  })());
  // const jQueryAvailable = await waitf
  // await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
