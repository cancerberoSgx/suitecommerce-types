import { Backbone, SCAUnitTestHelper, jQuery, BackboneView } from 'sc-types-frontend';
import MyFavoriteThings from '../src/MyFavoriteThings';
import DiscovererView from '../src/ui/DiscovererView';

export default describe('MyFavoriteThingsModule', () => {

  it('MyFavoriteThings module in app', async done => {
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
        }, 1000);
      },
      mountModules: [MyFavoriteThings]
    })

  })

})
