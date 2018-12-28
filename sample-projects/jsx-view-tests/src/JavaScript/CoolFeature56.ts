import { Application, ComponentContainer } from 'sc-types-frontend';
import CoolFeature56MainView  from './CoolFeature56MainView';

export default {
  mountToApp(application: Application) {
    const pdp = application.getComponent('PDP') // look ma no casting needed :)
    pdp.addChildView(pdp.PDP_FULL_VIEW, () => new CoolFeature56MainView())

    

    application.getLayout().on("afterAppendView", async view=>{
    //   view.addChildViewInstances()
    //   const m = new MineModel()
    //   const r = await m.magick(2)
    //   ReactLike.renderDOM(document.body, Main)
    //   // alert(`Hello fomr TS: ${r}`)
    })
  }
}

