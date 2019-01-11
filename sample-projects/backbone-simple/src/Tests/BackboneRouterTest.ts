import { Backbone } from 'sc-types-frontend';

export default describe('Backbone.Router', () => {

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

})

