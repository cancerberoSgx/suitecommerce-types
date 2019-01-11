import { Backbone, SCAUnitTestHelper } from 'sc-types-frontend';
import BackboneSimpleTest1Router from '../JavaScript/BackboneSimpleTest1Router';

export default describe('BackboneSimpleTest1Router', () => {

  it('handle page/1', async done => {
    let s = ''
    Backbone.history.stop()
    const r = new BackboneSimpleTest1Router()
    r.debugRouteListener= (page, args)=>{
      s = page + args.join(', ')
    }
    Backbone.history.start()
    Backbone.history.navigate('nonExistent', { trigger: true })
    Backbone.history.navigate('page/1', { trigger: true })
    expect(s).toContain('page1')
    Backbone.history.navigate('page/2', { trigger: true })
    expect(s).toContain('page2')
    Backbone.history.stop()
    Backbone.history.navigate('', { trigger: true })
    done()
  })

  it('instantiated in application module shows view', async done => {
    Backbone.history.stop()
    new SCAUnitTestHelper({
      startApplication: app=>{
        expect(jQuery('#content #1').length).toBe(0)
        Backbone.history.start()
        Backbone.history.navigate('nonExistent', { trigger: true })
        Backbone.history.navigate('page/1', { trigger: true })
        expect(jQuery('#content #1').length).toBe(1)
        Backbone.history.navigate('page/2', { trigger: true })
        expect(jQuery('#content #1').length).toBe(0)
        expect(jQuery('#content #2').length).toBe(1)
        Backbone.history.stop()
        Backbone.history.navigate('', { trigger: true })
        done()

      },
      mountModules: [{
        mountToApp(app){
          const r = new BackboneSimpleTest1Router()
          r.application = app
        }
      }]
    })
    
  })

})
