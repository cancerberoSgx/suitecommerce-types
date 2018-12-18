import { ReactNode } from './domElementDeclarations';

// import { ReactNode } from 'react';

export default class JSXComponent<P={}, S={}> {
  context: any

  state: Readonly<S> = {} as S
  
  refs: any = null
  
  readonly props: Readonly<{ children?: ReactNode }> & Readonly<P>
  
  constructor(props: Readonly<P>) {
    this.props = props
  }

  render(): ReactNode {
    throw new Error('Not Implemented')
  }

  setState(state: S, callback?: () => void): void {
    this.state = state
  }

  forceUpdate(callBack?: () => void): void { 
    throw new Error('Not Implemented')
  }

}
