import { BackboneView, jQuery, SCAUnitTestHelper } from 'sc-types-frontend';
import MyFavoriteThings from '../src/MyFavoriteThings';

export default describe('MyFavoriteThingsModule', () => {
  beforeAll(() => {
    jQuery('[data-test-id="DiscovererView"]').remove()
    jQuery('#main').remove()
  })
  it('MyFavoriteThings module in app', async done => {
    new SCAUnitTestHelper({
      startApplication: app => {
        expect(jQuery('[data-test-id="DiscovererView"]').length).not.toBe(0)
        done()
      },
      mountModules: [MyFavoriteThings]
    })

  })

})
