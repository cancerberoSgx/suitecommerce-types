// import { ReactNode } from '../reactLike/declarations/domElementDeclarations';

export default class JSXComponent<P={}, S={}> {
  context: any

  state: Readonly<S> = {} as S
  
  refs: any = null
  
  readonly props: Readonly<{ children?: JSX.Element }> & Readonly<P>
  
  constructor(props: Readonly<P>) {
    this.props = props
  }

  render(): JSX.Element {
    throw new Error('Not Implemented')
  }

  setState(state: S, callback?: () => void): void {
    this.state = state
  }

  forceUpdate(callBack?: () => void): void { 
    throw new Error('Not Implemented')
  }

}
