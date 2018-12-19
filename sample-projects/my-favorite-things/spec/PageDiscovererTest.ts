import { BackboneView, jQuery, SCAUnitTestHelper } from 'sc-types-frontend';
import MyFavoriteThings from '../src/MyFavoriteThings';

export default describe('PageDiscoverer', () => {

  beforeAll(() => {
    jQuery('[data-test-id="DiscovererView"]').remove()
    jQuery('#main').remove()
  })

  it('when user navigates PageDiscoverer should notify the manager so the DiscovererView is updated', async done => {
    new SCAUnitTestHelper({
      startApplication: app => {
        jQuery('#main').show()
        class V extends BackboneView {
          constructor(private m: string) { super() }
          template = () => `<h1>${this.m}</h1>`
        }
        app.getLayout().showContent(new V('Foo'))
        expect(jQuery('.new-interests').text()).toContain('Foo')
        expect(jQuery('.all-interests').text()).toContain('Foo')
        setTimeout(() => {
          app.getLayout().showContent(new V('Bar'))
          expect(jQuery('.new-interests').text()).toContain('Bar')
          expect(jQuery('.new-interests').text()).not.toContain('Foo')
          expect(jQuery('.all-interests').text()).toContain('Bar')
          expect(jQuery('.all-interests').text()).toContain('Foo')
          done()
        }, 100);
      },
      mountModules: [MyFavoriteThings]
    })

  })

})
