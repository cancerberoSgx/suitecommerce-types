import { join } from "path";

export function query(selector:string): Element[] {
  return Array.prototype.slice.call(document.querySelectorAll(selector))
}
export function wait(ms = 200) {
  return new Promise(r => {
    setTimeout(() => {
      r()
    }, ms);
  })
}
