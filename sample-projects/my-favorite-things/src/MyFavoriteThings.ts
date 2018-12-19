import { Application, ModuleEntryPoint } from 'sc-types-frontend'
import Manager  from './manager/Manager';
import {ReactLike} from 'sc-types-frontend-extras'
import DiscovererView from './ui/DiscovererView'

class Module implements ModuleEntryPoint {
  view: DiscovererView
  mountToApp(app: Application) {
    Manager.setup(app)
    ReactLike.supportFunctionAttributes=true
    this.view = new DiscovererView()
    this.view.$el = jQuery('<div></div>').appendTo('body')
    this.view.render()
  }
}

export default new Module()