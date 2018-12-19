
import { Application } from 'sc-types-frontend';
import { Interest } from '../types';
import { Discoverer, DiscovererConfig } from './discoverer';
import Manager, { UserNavigateListener } from '../manager/Manager';

export default class PageDiscover implements Discoverer<PageInterest>, UserNavigateListener {
  
  handleUserNavigate(application: Application): void {
    // application.getLayout().getCurrentView.t
  }

  manager: Manager
  
  setup(config: DiscovererConfig) {
    this.manager = config.manager
    this.manager.addUserNavigateListener(this)
  }
  
  discover(): PageInterest[] {
    return []
  }
}

export interface PageInterest extends Interest {
  url: string
}
