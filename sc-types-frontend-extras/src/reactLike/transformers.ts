import TypeGuards from './typeGuards';
import { ReactLikeTag, ReactLikeTextTransformer, ReactLikeValue, ReactLikeAttrs, ReactLikeChildTransformer, Transformers, ReactLike } from './ReactLike';
// import ReactLike from './ReactLike'


type RR = ReactLike  & (Transformers & {
  _globalTextTransformers: ReactLikeTextTransformer[],
  _globalChildTransformers:ReactLikeChildTransformer[],
})

function getThis(): RR {
  return (self as any).ReactLike
}

const Module = {
  
  _globalTextTransformers: [] as ReactLikeTextTransformer[],

  addTextTransformer(transform: ReactLikeTextTransformer): void {
    getThis()._globalTextTransformers.push(transform);
  },

  /**
   * Converts all TextNodes, first applies the global TextTransformer s registered with ReactLike.globalTextTransformers() and then if the tag is a TextTransformer also that
   */
  _transformText(tag: ReactLikeTag, attrs: ReactLikeAttrs, parent: HTMLElement, child: Node | ReactLikeValue, text: string): string {
    getThis()._globalTextTransformers.forEach(t => {
      text = t.transformText(tag, attrs, parent, child, text);
    });
    if (TypeGuards.isTextTransformer(tag)) {
      text = tag.transformText(tag, attrs, parent, child, text);
    }
    return text;
  },


  _globalChildTransformers: [] as ReactLikeChildTransformer[],

  addChildTransformer(transform: ReactLikeChildTransformer): void {
    getThis()._globalChildTransformers.push(transform);
  },
  
  _transformChild(tag: ReactLikeTag, attrs: ReactLikeAttrs, parent: HTMLElement, child: Node): Node {
    getThis()._globalChildTransformers.forEach(t => {
      child = t.transformChild(tag, attrs, parent, child);
    });
    if (TypeGuards.isChildTransformer(tag)) {
      child = tag.transformChild(tag, attrs, parent, child);
    }
    return child;
  },
};


export default Module
// export default {
//   public: Module as Transformers, 
//   private: Module
// }


