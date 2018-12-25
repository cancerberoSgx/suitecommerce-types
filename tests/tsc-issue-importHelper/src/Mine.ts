
import { Application } from 'sc-types-frontend'
define('Mine', ['MineModel'], function(MineModel: any){
  
  return {
    mountToApp(application: Application) {
      application.getLayout().on("afterAppendView", async view=>{
        const m = new MineModel()
        const r = await m.magick(2)
        alert(`Hello fomr TS: ${r}`)
      })
    }
}
})

  