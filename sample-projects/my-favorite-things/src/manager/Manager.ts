import { BackboneView, Application, View } from 'sc-types-frontend';
import { Discoverer } from '../discoverer/discoverer';
import { Favorite, Interest, InterestType, InterestScope } from '../types';
import PageDiscover from '../discoverer/PageDiscoverer';

export default class Manager {
  private static instance: Manager
  static setup(application: Application): void {
    Manager.instance = new Manager(application);
  }
  static getInstance(): Manager {
    return Manager.instance;
  }

  protected interests: Interest[]
  protected currentView: View

  private constructor(protected application: Application) {
    this.handleAfterAppendViewCb = this.handleAfterAppendView.bind(this)
    this.handleCurrentViewRenderedCb = this.handleCurrentViewRendered.bind(this)
    this.application.getLayout().on('afterAppendView', this.handleAfterAppendViewCb)
    this.interests = []
    this.addDiscoverers([
      new PageDiscover().setup({manager: this}), 
    ])
  }
  protected handleAfterAppendViewCb: () => {}
  protected handleCurrentViewRenderedCb: () => {}
  /** called from module registered in app */
  protected handleAfterAppendView() {
    if (this.currentView) {
      this.currentView.off('afterCompositeViewRender', this.handleCurrentViewRenderedCb)
    }
    this.currentView = this.application.getLayout().getCurrentView()
    this.currentView.on('afterCompositeViewRender', this.handleCurrentViewRenderedCb)
    this.discover()
  }
  protected handleCurrentViewRendered() {
    this.discover()
  }
  getApplication(): Application{
    return this.application
  }
  protected discover() {
    let newI: Interest[] = []
    this.discoverers.forEach(d => {
      newI = newI.concat(d.discover().filter(i => this.interests.find(ii => ii !== i && ii.id !== i.id)))
    })
    this.interestsDiscoverListeners.forEach(l => l.handle(newI))
  }

  dispose() {
    this.application.getLayout().off('afterAppendView', this.handleAfterAppendViewCb)
    if (this.currentView) {
      this.currentView.off('afterCompositeViewRender', this.handleCurrentViewRenderedCb)
    }
    this.discoverers.forEach(d => d.dispose())
  }

  protected discoverers: Discoverer[] = []
  public addDiscoverers(d: Discoverer[]): void {
    this.discoverers = this.discoverers.concat(d)// TODO: dedup
  }

  private interestTypes: InterestType[] = []
  addInterestTypes(interestTypes: InterestType[]) {
    this.interestTypes = this.interestTypes.concat(interestTypes) // TODO: dedup
  }
  getInterestType(id: string): InterestType | undefined {
    return this.interestTypes.find(t => t.id == id)
  }


  private interestScopes: InterestScope[] = []
  addInterestScopes(interestScopes: InterestScope[]) {
    this.interestScopes = this.interestScopes.concat(interestScopes) // TODO: dedup
  }
  getInterestScope(id: string): InterestScope | undefined {
    return this.interestScopes.find(t => t.id == id)
  }



  addInterestsDiscoverListener(l: InterestDiscoveredListener): void {
    this.interestsDiscoverListeners.push(l)
  }
  removeInterestsDiscoverListener(l: InterestDiscoveredListener): void {
    this.interestsDiscoverListeners = this.interestsDiscoverListeners.filter(ll => ll !== l)
  }
  private interestsDiscoverListeners: InterestDiscoveredListener[] = []

}

export interface ManagerListener<T extends any[]= any[]> {
  handle(...args: T): void
}

export interface InterestDiscoveredListener extends ManagerListener<[Interest[]]> {
}
