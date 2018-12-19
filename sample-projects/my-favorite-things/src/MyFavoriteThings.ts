import { Application } from 'sc-types-frontend'
import Manager  from './manager/Manager';
import DiscovererView from './ui/DiscovererView'

export default {
  async mountToApp(app: Application) {
    await Manager.setup(app)
    app.getLayout().on('afterAppendView', () => {
      new DiscovererView().render()
    })
  }
}
