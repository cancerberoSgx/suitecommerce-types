import { Backbone, SCAUnitTestHelper, jQuery } from 'sc-types-frontend';
import MyFavoriteThings from '../src/MyFavoriteThings';
import DiscovererView from '../src/ui/DiscovererView';

export default describe('MyFavoriteThingsModule', () => {

  it('MyFavoriteThings module in app', async done => {
    new SCAUnitTestHelper({
      startApplication: app=>{
        jQuery('#main').show()
        const view = new DiscovererView()
        app.getLayout().showContent(view)
        done()
      },
      mountModules: [MyFavoriteThings]
    })
    
  })

})
