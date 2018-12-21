import { Model, ModelConstructor } from "./Model";

export interface Collection<T extends Model=any>{
    at(i:number):T
}

export interface CollectionConstructor<M extends Model=Model>{
	new (...any):M
    extend(def:Partial<Collection<M>>):CollectionConstructor<M>
    model: ModelConstructor<M>
}

export function BackboneCollection<V extends Model=Model>(backboneObject): CollectionConstructor<V>{
    return backboneObject.Collection
}
