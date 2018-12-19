import ReactLike, { ReactLikeTextTransformer } from '../../reactLike/ReactLike'
import { Utils } from 'sc-types-frontend';

interface BindProps {
  children: Text[]|Text
}
/**
 * JSX `<Translate>` helper
 */
let _Translate: (((props: BindProps) => JSX.Element) & ReactLikeTextTransformer) = Object.assign(
  function (prop: BindProps): JSX.Element {
    return <span></span>
  },
  {
    transformText(tag: any, attrs: any, parent: HTMLElement, child: Node, text: string): string {
      return Utils.translate(text)
    }
  })

// {
//   transformText(tag: any, attrs: any, parent: HTMLElement, child: Node, text: string): string} = {...function _Translate(prop: BindProps): JSX.Element{
//   return <span data-type="bind"></span>
// }, transformText(tag: any, attrs: any, parent: HTMLElement, child: Node, text: string): string{
//   return text
// }
// }
// }

export default _Translate


function isHTMLElement(n: any): n is HTMLElement {
  return n && n.nodeType === 1 && n.outerHTML
}
