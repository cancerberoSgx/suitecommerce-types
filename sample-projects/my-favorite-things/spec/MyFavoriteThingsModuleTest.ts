import { Backbone, SCAUnitTestHelper } from 'sc-types-frontend';
import MyFavoriteThings from '../src/MyFavoriteThings';

export default describe('MyFavoriteThingsModule', () => {

  it('MyFavoriteThings module in app', async done => {
    Backbone.history.stop()
    new SCAUnitTestHelper({
      startApplication: app=>{
        Backbone.history.start()
        Backbone.history.stop()
        Backbone.history.navigate('', { trigger: true })
        done()

      },
      mountModules: [MyFavoriteThings]
    })
    
  })

})
