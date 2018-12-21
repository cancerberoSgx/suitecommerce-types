import { ViewConstructor } from "./View";
import { ModelConstructor } from "./Model";
import { CollectionConstructor } from "./Collection";

export interface BackboneType {
    View: ViewConstructor,
    Model: ModelConstructor,
    Collection: CollectionConstructor
}