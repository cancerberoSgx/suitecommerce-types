
import Manager from '../manager/Manager';
import { Interest, InterestType } from '../types';
import { Discoverer, DiscovererConfig } from './discoverer';

export default class PageDiscover implements Discoverer<PageInterest> {
  private visitedPages: PageInterest[]
  private type: InterestType
  private  manager: Manager

  // public constructor(config: DiscovererConfig) {
  // }

  setup(config: DiscovererConfig): this {

    this.manager = config.manager
    // this.manager.addUserNavigateListener(this)
    this.visitedPages = []
    this.type = {
      scope: this.manager.getInterestScope('page'),
      name: 'Visited page',
      id: 'visited-page',
      description: 'TODO'
    }
    this.manager.addInterestTypes([this.type])
    this.manager.addDiscoverers([this])
    return this
  }

  discover(): PageInterest[] {
    const view = this.manager.getApplication().getLayout().getCurrentView()
    // TODO: check if already visited and dont notify
    const page: PageInterest = {
      id: 'visited_page_' + view.cid,
      creationDate: new Date(),
      name: view.getTitle() || document.title || view.$('h1').text() || 'visited_page_' + view.cid,
      description: view.getPageDescription() || view.getMetaDescription(),
      url: location.href,
      type: this.type,
      save(page: PageInterest) {
        return 'TODO'
      },
      load(s: string): PageInterest {
        return null
      }
    }
    return [page];
    // 
  }

  dispose(){}
  // discover(): PageInterest[] {
  //   return []
  // }

}

export interface PageInterest extends Interest {
  url: string
}
