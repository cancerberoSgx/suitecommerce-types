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
  getInterests(): Interest[] {
    return this.interests
  }
  protected currentView: View | undefined

  private constructor(protected application: Application) {
    this.handleAfterAppendViewCb = this.handleAfterAppendView.bind(this)
    this.handleCurrentViewRenderedCb = this.handleCurrentViewRendered.bind(this)
    this.application.getLayout().on('afterAppendView', this.handleAfterAppendViewCb)
    this.interests = []
    this.addDefaultInterestScopes()
    this.addDefaultDiscoverers()
  }
  protected handleAfterAppendViewCb: () => void
  protected handleCurrentViewRenderedCb: () => void
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
  getApplication(): Application {
    return this.application
  }
  protected discover() {
    let newI: Interest[] = []
    this.discoverers.forEach(d => {
      newI = newI.concat(d.discover().filter(i => !this.interests.find(ii => ii.equals(i))))
    })
    this.interests = this.interests.concat(newI)
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

  getInterestScopeOrThrow(id: string): InterestScope {
    const i = this.getInterestScope(id)
    if (!i) { throw new Error('getInterestScopeOrThrow') }
    return i
  }
  getInterestType(id: string): InterestType | undefined {
    return this.interestTypes.find(t => t.id == id)
  }
  getInterestOfType<T extends Interest = Interest>(type: InterestType): T[] {
    return this.interests.filter(i => i.type === type) as T[]
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


  private addDefaultInterestScopes(): any {
    this.addInterestScopes([
      {
        id: 'site', name: 'site', description: 'interests at the website level'
      },
      {
        id: 'page', name: 'page', description: 'interests at a particular page level'
      }
    ])
  }
  private addDefaultDiscoverers(): any {
    this.addDiscoverers([
      new PageDiscover().setup({ manager: this }),
    ])
  }
}

export interface ManagerListener<T extends any[]= any[]> {
  handle(...args: T): void
}

export interface InterestDiscoveredListener extends ManagerListener<[Interest[]]> {
}
