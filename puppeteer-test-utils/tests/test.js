const config = {
  modulePath = '/home/sg/git/WASM-ImageMagick/node_modules/puppeteer',
  url = 'http://localhost:7777/test1.html'
}

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const page = await browser.newPage();
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
  const jQueryAvailable = await waitf
  
  await page.goto(url);
  await page.screenshot({ path: 'example.png' });

  await browser.close();

  function wait(ms) {
    return new Promise(r => {
      setTimeout(() => {
        r()
      }, ms);
    })
  }
  async function waitForGlobalBrowser(g, ms = 300, timeout=2000) {
    return new Promise(resolve => {
      const t = setInterval(() => {
        if (typeof window[g] !== 'undefined') {
          clearInterval(t)
          resolve(true)
        }
      }, ms);
      setTimeout(() => {
        clearInterval(t)
          resolve(false)
      }, timeout);
    })
  }
  // async function waitForGlobalLocal(page, g, ms=300, timeout=2000){
  //   return await await page.evaluate(waitForGlobalBrowser,
  // })

})();