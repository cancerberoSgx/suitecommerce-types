export interface Model{
    get<T=any>(k:string):T
    set<T=any>(k:string, v:T)
    fetch(): Promise<this>
    save(): Promise<this>
    attributes:{[name:string]:any}
}

export interface ModelConstructor<M extends Model =Model>{
    extend(def:Partial<M>):ModelConstructor<M>
	new <M2 extends Model =M>(...any):M2
}

export function BackboneModel<V extends Model=Model>(backboneObject): ModelConstructor<V>{
    return backboneObject.Model
}
