import { BackboneModel } from 'sc-types-frontend';

export const MineModel = BackboneModel.extend({
  async magick(t:1|2|3|4): Promise<number>{
    await sleep(t)
    return t+1
  }
})
async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(() => {
    resolve()
  }, ms))
}