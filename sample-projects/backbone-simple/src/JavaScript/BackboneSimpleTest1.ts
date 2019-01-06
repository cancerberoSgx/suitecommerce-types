import { Application } from 'sc-types-frontend'
import BackboneSimpleTest1View from './BackboneSimpleTest1View';

export default {
  mountToApp(application: Application) {
    const pdp = application.getComponent('PDP') // look ma no casting needed :)
    pdp.addChildViews(
      pdp.PDP_FULL_VIEW, {
        'Global.StarRating': {
          'backbone-simple-test1': {
            childViewIndex: 1,
            childViewConstructor: () => new BackboneSimpleTest1View()
          }
        }
      }
    )
    
    application.getLayout().on("afterAppendView", async view => {
    })
  }
}

