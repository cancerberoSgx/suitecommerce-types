import { Application } from 'sc-types-frontend';
import MineModel  from './MineModel';

export default {
    mountToApp(application: Application) {
      alert('seba')
      application.getLayout().on("afterAppendView", async view=>{
        const m = new MineModel()
        const r = await m.magick(2)
        alert(`Hello fomr TS: ${r}`)
      })
    }
} 
