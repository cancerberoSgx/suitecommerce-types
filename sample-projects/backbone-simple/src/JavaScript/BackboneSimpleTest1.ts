import { Application } from 'sc-types-frontend'
import BackboneSimpleTest1ListView from './BackboneSimpleTest1ListView'
import BackboneSimpleTest1Router from './BackboneSimpleTest1Router';

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
    new BackboneSimpleTest1Router()
    application.getLayout().on("afterAppendView", async view => {
    })
  }
}

