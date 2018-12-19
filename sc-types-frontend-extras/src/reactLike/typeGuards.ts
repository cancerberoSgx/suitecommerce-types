import { ReactLikeTextTransformer, ReactLikeChildTransformer, ReactLikeChildAddTransformer, ReactLikeComponent } from './ReactLike';

export default {
  isTextTransformer(n: any): n is ReactLikeTextTransformer {
    return n && n.transformText
  },

  isChildTransformer(n: any): n is ReactLikeChildTransformer {
    return n && n.transformChild
  },

  isReactLikeChildAddTransformer(n: any): n is ReactLikeChildAddTransformer {
    return n && n.addChild
  },
  isNode(n: any): n is Node {
    return n && n.nodeType
  },
  isReactLikeComponent(c: any): c is ReactLikeComponent {
    return c.prototype && c.prototype.render
  },

  isHTMLElement(n: any): n is HTMLElement {
    return n && n.nodeType === 1 && n.outerHTML
  }

}