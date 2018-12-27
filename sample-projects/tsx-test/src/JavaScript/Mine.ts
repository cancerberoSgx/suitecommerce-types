import { Application } from 'sc-types-frontend';
import { MineModel } from './MineModel';
import { ReactLike } from './ReactLike';
import { Main } from './Main';

export const Mine = {
    mountToApp(application: Application) {
      // alert('seba')
      application.getLayout().on("afterAppendView", async view=>{
        const m = new MineModel()
        const r = await m.magick(2)
        ReactLike.renderDOM(document.body, Main)
        // alert(`Hello fomr TS: ${r}`)
      })
    }
}
