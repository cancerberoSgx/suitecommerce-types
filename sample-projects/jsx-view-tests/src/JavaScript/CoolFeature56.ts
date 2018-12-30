import { Application, ComponentContainer, } from 'sc-types-frontend';
import CoolFeature56MainView from './CoolFeature56MainView';
import CoolFeature56MainView2 from './CoolFeature56MainView2';

export default {
  mountToApp(application: Application) {
    const pdp = application.getComponent('PDP') // look ma no casting needed :)
    pdp.addChildView(pdp.PDP_FULL_VIEW, () => new CoolFeature56MainView())

    pdp.addChildViews(
      pdp.PDP_FULL_VIEW, {
        'Global.StarRating': {
          'cool-feature': {
            childViewIndex: 1,
            childViewConstructor: () => new CoolFeature56MainView()
          },
          'cool-feature-2': {
            childViewIndex: 2,
            childViewConstructor: () => new CoolFeature56MainView2()
          }
        }
      }
    )
    
    application.getLayout().on("afterAppendView", async view => {
    })
  }
}

