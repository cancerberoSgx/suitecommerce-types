export interface Base {
  id: string
  name: string
  description?: string
}

export interface Interest extends Base {
  type: InterestType
  creationDate: Date
  save(i: Interest): string
  load(s: string): Interest
}

/** an interest that user added to one of its lists */
export interface Favorite extends Interest {
  /** user notes of why they like it */
  // notas del usuario sobre porqué le gustó este interes
  reason?: string
}

/** examples: 'item', 'item-options', 'search', 'category', 'options', 'facet' */
export interface InterestType extends Base {
  scope: InterestScope
}

/** examples: 'site', 'catalog', 'item', 'order', 'customer */
export interface InterestScope extends Base {
  
}

//  // should be enum or 'item'|'search' but let it free so is easy to add new ones