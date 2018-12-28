import { BackboneModel } from 'sc-types-frontend';

export default class extends BackboneModel {
  async magick(t:1|2|3|4): Promise<number>{
    await sleep(t)
    return t+1
  }
}
async function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => {
    resolve()
  }, ms))
}