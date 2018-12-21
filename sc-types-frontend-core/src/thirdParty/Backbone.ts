import { ViewConstructor, View } from "./View";
import { ModelConstructor } from "./Model";
import { CollectionConstructor } from "./Collection";

export interface BackboneType {
    View: ViewConstructor<View>,
    Model: ModelConstructor,
    Collection: CollectionConstructor
}