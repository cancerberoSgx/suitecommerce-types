import { Application } from 'sc-types-frontend';
import { MineModel, sleep } from './MineModel';

export const Mine = {
    mountToApp(application: Application) {
      application.getLayout().on("afterAppendView", async view=>{
        const m = new MineModel()
        const r = await m.magick(2)
        alert(`Hello fomr TS: ${r}`)
      })
    }
}

async function magick(t:1|2|3|4): Promise<number>{
    await sleep(t)
    const s= `${Math.random()<0.5 ? 1:2}`
    return s.length>4?2:1
  }
