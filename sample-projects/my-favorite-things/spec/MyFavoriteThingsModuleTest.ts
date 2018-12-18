import { BackboneView, jQuery, SCAUnitTestHelper } from 'sc-types-frontend';
import MyFavoriteThings from '../src/MyFavoriteThings';

export default describe('MyFavoriteThingsModule', () => {
  beforeAll(() => {
    jQuery('#main').remove()
  })
  it('MyFavoriteThings module in app', async done => {

    expect(jQuery('[data-test-id="DiscovererView"]').length).toBe(0)
    new SCAUnitTestHelper({
      startApplication: app => {
        // jQuery('#main').show()
        expect(jQuery('[data-test-id="DiscovererView"]').length).not.toBe(0)
        done()
      },
      mountModules: [MyFavoriteThings]
    })

  })

})
