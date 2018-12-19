import { BackboneView, Application } from 'sc-types-frontend';
import { Discoverer } from '../discoverer';
import { Favorite, Interest } from '../types';

export default class Manager {

  static setup(application: Application): void {
    instance = new Manager(application);
  }

  static getInstance(): Manager {
    return instance;
  }

  protected discoverers: Discoverer[] = []

  private constructor(protected application: Application) {
    application.getLayout().on('afterAppendView', this.handleAfterAppendView.bind(this))
  }

  /** called from module registered in app */
  handleAfterAppendView(view: BackboneView) {
    this.discoverers.forEach(d => d.discover())
  }

  registerDiscoverer(d: Discoverer): void {
    this.discoverers.push(d)
  }

  getFavorites<F extends Favorite = Favorite>(config: FavoritesQuery): F[] {
    return []
  }

  addInterestsDiscoverListener(l: InterestDiscoveredListener): void {
    this.interestsDiscoverListeners.push(l)
  }

  removeInterestsDiscoverListener(l: InterestDiscoveredListener): void {
    this.interestsDiscoverListeners = this.interestsDiscoverListeners.filter(ll => ll !== l)
  }

  addUserNavigateListener(l: UserNavigateListener): void {
    this.userNavigateListeners.push(l)
  }

  removeUserNavigateListener(l: InterestDiscoveredListener): void {
    this.interestsDiscoverListeners = this.interestsDiscoverListeners.filter(ll => ll !== l)
  }

  interestsDiscoverListeners: InterestDiscoveredListener[] = []

  userNavigateListeners: UserNavigateListener[] = []
}

export interface ManagerListener<T extends any[]= any[]> {
  handle(...args: T): void
}

export interface InterestDiscoveredListener extends ManagerListener<[Interest[]]> {
  handle(interests: Interest[]): void
}

export interface UserNavigateListener extends ManagerListener<[Application]> {
  handle(application: Application): void
}

/** a query for favorites configuration object. if empty object will reference all known favorites */
export interface FavoritesQuery {
  /** true: only saved, false: only not saved, undefined: all */
  saved?: boolean
  /** true: get me the current things, current item favorites, current page, current catalog, etc, false: only not current things (discovered items other than current, previous visited pages, etc). undefined: all */
  current?: boolean
  /** if defined it will get only those explicit favorites */
  ids?: string[]
  /**  */
  scope?: string
}


let instance: Manager