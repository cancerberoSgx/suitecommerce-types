import TypeGuards from '../typeGuards'
import ReactLike from '../ReactLike'
import JSXBindView from '../../jsx/JSXBindView';

interface BindProps<View extends JSXBindView = JSXBindView> {
  name: string
  children?: JSX.Element|JSX.Element[]
  /** in the case the attribute is a collection this is the view class to render the items */
  view?: View
}
/**
 * Support JSX <Bind> tag to declare bindings with like: `<Bind name="age"><input type="number"></input></Bind>`
 * prints something like: `<input type="text" data-bind="age"></input>`. 
 * 
 * Uses `ReactLike.transformChild` feature
 * 
 * Is used by JSXBindView to easy bind model-dom
 * 
 * Supports Backbone.Collection attribute values render items using `view` class
 */
const _Bind = function _Bind(prop: BindProps): JSX.Element{
  return <span data-type="bind"></span>
}

_Bind.transformChild = (tag: any, attrs: any, parent: HTMLElement, child: Node)=>{
  if(attrs.name && TypeGuards.isHTMLElement(child)){
    child.setAttribute('data-bind', attrs.name); 
  }
  return child
}

export default _Bind
