// import { Page, EvaluateFn } from 'puppeteer';

// // TODO: move to misc-utils-of-mine-generic


// export async function waitForBrowser(predicate: () => boolean, ms = 300, timeout = 2000): Promise<boolean> {
//   return new Promise(resolve => {
//     const t = setInterval(() => {
//       if (predicate()) {
//         clearInterval(t)
//         resolve(true)
//       }
//     }, ms)
//     setTimeout(() => {
//       clearInterval(t)
//       resolve(false)
//     }, timeout);
//   })
// }

// export async function waitForElementBrowser(selector: string, ms = 300, timeout = 2000): Promise<boolean> {
//   return waitForBrowser(() => !!document.querySelector(selector), ms, timeout)
// }

// export async function waitForGlobalBrowser(g: string, ms = 300, timeout = 2000): Promise<boolean> {
//   return waitForBrowser(() => typeof window[g] !== 'undefined', ms, timeout)
// }

// export async function waitFor(page: Page, predicate: () => boolean, ms = 300, timeout = 2000): Promise<boolean> {
//   return await page.evaluate(waitForBrowser, predicate, ms, timeout)
// }

// export async function waitForGlobal(page: Page, globalName = 'jQuery', ms = 300, timeout = 2000): Promise<boolean> {
//   function predicate (g) {
//     return  typeof window[g] !== 'undefined'
//   }

//   const s = `
//   (function(){
//     ${waitForBrowser.toString()}; 
//     ${predicate.toString()};  
//     return waitForBrowser.apply(this, arguments)
//   })
//     `
//     console.log(s);
//     page.waitFor
//     const f = eval(s) as EvaluateFn
//   // return Promise.resolve(true)
//   return await page.evaluate(f, globalName, ms, timeout)
// }