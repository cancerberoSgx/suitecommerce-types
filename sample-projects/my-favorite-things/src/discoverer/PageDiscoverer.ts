
import Manager from '../manager/Manager';
import { Interest, InterestType } from '../types';
import { Discoverer, DiscovererConfig } from './discoverer';

export default class PageDiscover implements Discoverer<PageInterest> {
  // private visitedPages: PageInterest[]
  private type: InterestType
  private  manager: Manager

  setup(config: DiscovererConfig): this {
    this.manager = config.manager
    // this.visitedPages = []
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
      },
      equals(i: PageInterest){
        return this.url===i.url && this.name===IDBCursor.name
      }
    }
    return [this.manager.getInterestOfType(this.type).find(i=>i.equals(page)) as PageInterest || page]
  }
  dispose(){

  }
}

export interface PageInterest extends Interest {
  url: string
}
