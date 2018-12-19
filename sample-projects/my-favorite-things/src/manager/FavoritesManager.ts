import { Favorite } from '../types';
import Manager from './Manager';

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

export default class FavoritesManager {
  static instance: FavoritesManager
  static setup(manager: Manager): void {
    FavoritesManager.instance = new FavoritesManager(manager);
  }
  static getInstance(): FavoritesManager {
    return FavoritesManager.instance;
  }

  private favorites: Favorite[]
  private constructor(protected manager: Manager) {

  }

  getFavorites<F extends Favorite = Favorite>(config: FavoritesQuery): F[] {
    return this.favorites as F[]
  }
}

