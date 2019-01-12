import { Backbone, Application, BackboneView, BackboneModel, TemplateContext, SCAUnitTestHelper } from 'sc-types-frontend';
import template from 'backbone_simple_test1_landing_view.tpl';

export default describe('sc-types-frontend-core Backbone.Router', () => {

  it('Backbone.Router.extend()', async done => {
    let counter = 0
    Backbone.history.stop()
    var Workspace = Backbone.Router.extend({
      routes: {
        "help": "help"
      },
      help: function () {
        counter++
      }
    })
    new Workspace()
    Backbone.history.start()
    Backbone.history.navigate('help1', { trigger: true })
    Backbone.history.navigate('help', { trigger: true })
    expect(counter).toBeGreaterThan(0)

    Backbone.history.stop()
    counter = 0
    Backbone.history.navigate('help1', { trigger: true })
    Backbone.history.navigate('help', { trigger: true })
    expect(counter).toBe(0, 'stop() should stop route listening')
    done()
  })

  xit('class extends Backbone.Router', async done => {
    // does not work because of types issue - routes should be a method so its in the prototype, just like View.events
    let counter = 0
    Backbone.history.stop()
    class Workspace2 extends Backbone.Router {
      routes = {
        "help": "help"
      }
      help() {
        counter++
      }
    }
    new Workspace2()

    Backbone.history.start()
    Backbone.history.navigate('nonExistent', { trigger: true })
    Backbone.history.navigate('help', { trigger: true })
    expect(counter).toBeGreaterThan(0)

    counter = 0
    Backbone.history.stop()
    Backbone.history.navigate('help1', { trigger: true })
    Backbone.history.navigate('help', { trigger: true })
    expect(counter).toBe(0, 'stop() should stop route listening')

    Backbone.history.stop()
    Backbone.history.navigate('', { trigger: true })
    done()
  })

  it('class extends Backbone.Router routes in prototype to workaround the problem', async done => {
    let counter = 0
    Backbone.history.stop()
    class Workspace2 extends Backbone.Router {
      help() {
        counter++
      }
    }
    Workspace2.prototype.routes = {
      "help3": "help"
    }
    new Workspace2()
    Backbone.history.start()
    Backbone.history.navigate('nonExistent', { trigger: true })
    Backbone.history.navigate('help3', { trigger: true })
    expect(counter).toBeGreaterThan(0)

    counter = 0
    Backbone.history.stop()
    Backbone.history.navigate('nonExistent', { trigger: true })
    Backbone.history.navigate('help3', { trigger: true })
    expect(counter).toBe(0, 'stop() should stop route listening')

    Backbone.history.stop()
    Backbone.history.navigate('', { trigger: true })
    done()
  })

  it('class extends Backbone.Router routes defined with getters  so they are in in prototype to workaround the problem', async done => {
    let counter = 0
    Backbone.history.stop()
    class Workspace2 extends Backbone.Router {
      get routes() {
        return { "help3": "help" }
      }
      help() {
        counter++
      }
    }
    new Workspace2()
    Backbone.history.start()
    Backbone.history.navigate('nonExistent', { trigger: true })
    Backbone.history.navigate('help3', { trigger: true })
    expect(counter).toBeGreaterThan(0)

    counter = 0
    Backbone.history.stop()
    Backbone.history.navigate('nonExistent', { trigger: true })
    Backbone.history.navigate('help3', { trigger: true })
    expect(counter).toBe(0, 'stop() should stop route listening')

    Backbone.history.stop()
    Backbone.history.navigate('', { trigger: true })
    done()
  })


  describe('a router in an app ', ()=>{

    //     import template from 'backbone_simple_test1_landing_view.tpl';
    // import { BackboneModel, BackboneView, TemplateContext } from 'sc-types-frontend';

    class BackboneSimpleTest1LandingView extends BackboneView<BackboneModel, ViewContext> {

      template = template

      events() {
        return {
        }
      }

      initialize(options) {
        super.initialize(options)
        this.pageId = options.id
      }

      private pageId: string

      getContext(): (TemplateContext & { id: string }) {
        return {
          id: this.pageId
        }
      }
    }

    interface ViewContext extends TemplateContext {
      id: string
    }

    class BackboneSimpleTest1Router extends Backbone.Router {
      debugRouteListener: (s: string, args: string[]) => any
      application: Application

      // heads up we need to declare a getter because - cannot put routes as property here because backbone needs it to be in prototype, just like Backbone.View.events - need to be typed as method
      get routes() {
        return { 'page/:id': 'page' }
      }

      page(id?: string) {
        const view = new BackboneSimpleTest1LandingView({ id })
        this.application && this.application.getLayout().showContent(view)
        this.debugRouteListener && this.debugRouteListener('page', [id])
      }
    }
    
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



})

