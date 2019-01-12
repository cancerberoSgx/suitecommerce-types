import { Backbone, SCAUnitTestHelper } from 'sc-types-frontend';
import SCTypesFrontEndCoreView from '../../JavaScript/backbone/SCTypesFrontEndCoreView';

export default describe('Application', () => {
  describe('Layout', () => {
    it('should fire events', async done => {
      const events: string[] = []
      Backbone.history.stop()
      new SCAUnitTestHelper({
        startApplication: app => {
          Backbone.history.start()
          const view = new SCTypesFrontEndCoreView();
          view.id = '1231'
          app.getLayout().showContent(view)
          expect(events).toContain('beforeAppendToDom 3433')
          expect(events).toContain('afterAppendToDom 3433')
          expect(events).toContain('afterAppendView 1231')
          expect(events).toContain('beforeAppendView 1231')
          done()
        },
        mountModules: [{
          mountToApp(app) {
            app.getLayout().id = "3433"
            app.getLayout().on('beforeAppendToDom', layout => {
              events.push(`beforeAppendToDom ${layout.id}`)
            })
            app.getLayout().on('afterAppendToDom', layout => {
              events.push(`afterAppendToDom ${layout.id}`)
            })
            app.getLayout().on('afterAppendView', view => {
              events.push(`afterAppendView ${view.id}`)
            })
            app.getLayout().on('beforeAppendView', view => {
              events.push(`beforeAppendView ${view.id}`)
            })
          }
        }]
      })
    })
  })
})


