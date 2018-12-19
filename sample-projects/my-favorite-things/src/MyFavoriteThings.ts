import { Application } from 'sc-types-frontend'
import Manager  from './manager/Manager';
import {ReactLike} from 'sc-types-frontend-extras'
import DiscovererView from './ui/DiscovererView'

export default {
  mountToApp(app: Application) {
    Manager.setup(app)
    ReactLike.supportFunctionAttributes=true
    // app.getLayout().on('afterAppendView', () => {
    //   alert('hello')
      
    // })
  }
}
