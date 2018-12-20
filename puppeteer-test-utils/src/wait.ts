import {Page} from 'puppeteer'

export function wait(ms=200) {
  return new Promise(r => {
    setTimeout(() => {
      r()
    }, ms);
  })
}

export async function waitForGlobalBrowser(g, ms = 300, timeout=2000) {
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

export async function waitForGlobalLocal(page: Page, globalName='jQuery', ms=300, timeout=2000){
  return await page.evaluate(waitForGlobalBrowser, globalName, ms, timeout)
}