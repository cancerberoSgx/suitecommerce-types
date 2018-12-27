import { Application, ComponentContainer } from 'sc-types-frontend';
import { CoolFeature56MainView } from './CoolFeature56MainView';

export const CoolFeature56 = {
  mountToApp(container: ComponentContainer) {
    const pdp = container.getComponent('PDP') // look ma no casting needed :)
    pdp.addChildView(pdp.PDP_FULL_VIEW, () => new CoolFeature56MainView())

    // application.getLayout().on("afterAppendView", async view=>{
    //   const m = new MineModel()
    //   const r = await m.magick(2)
    //   ReactLike.renderDOM(document.body, Main)
    //   // alert(`Hello fomr TS: ${r}`)
    // })
  }
}

