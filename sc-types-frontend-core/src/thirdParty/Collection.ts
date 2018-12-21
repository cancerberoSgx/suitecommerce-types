export interface Collection<T=any>{
    at(i:number):T
}

export interface CollectionConstructor{
    extend(def:any):CollectionConstructor
}
