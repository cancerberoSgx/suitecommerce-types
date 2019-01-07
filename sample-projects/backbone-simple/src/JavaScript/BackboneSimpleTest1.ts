import { Application } from 'sc-types-frontend'
import BackboneSimpleTest1View from './BackboneSimpleTest1View'
import BackboneSimpleTest1ListView from './BackboneSimpleTest1ListView'

export default {
  mountToApp(application: Application) {
    const pdp = application.getComponent('PDP') // look ma no casting needed :)
    pdp.removeChildView(pdp.PDP_FULL_VIEW, 'Global.StarRating')
    pdp.addChildViews(
      pdp.PDP_FULL_VIEW, {
        'Global.StarRating': {
          'backbone-simple-test1':  {
            childViewConstructor: BackboneSimpleTest1ListView
          },
          'backbone-simple-test2': {
            childViewConstructor: () => new BackboneSimpleTest1ListView()
          }
        }
      }
    )
    
    application.getLayout().on("afterAppendView", async view => {
    })
  }
}

