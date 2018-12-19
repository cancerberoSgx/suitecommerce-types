import ReactLike from './ReactLike'

interface BindProps {
  name: string
  children: JSX.Element|JSX.Element[]
}
/**
 * Support JSX <Bind> tag to declare bindings with like:
`<Bind name="age"><input type="number"></input></Bind>`
which should output should something like this:
`<input type="text" data-bind="age"></input>`. 

Uses `ReactLike.transformChild` feature
 */
const _Bind = function _Bind(prop: BindProps): JSX.Element{
  return <span data-type="bind"></span>
}

_Bind.transformChild = (tag: any, attrs: any, parent: HTMLElement, child: Node)=>{
  if(attrs.name && isHTMLElement(child)){
    child.setAttribute('data-bind', attrs.name); 
  }
  return child
}

export default _Bind

function isHTMLElement(n : any): n is HTMLElement{
  return n && n.nodeType===1 && n.outerHTML
}
