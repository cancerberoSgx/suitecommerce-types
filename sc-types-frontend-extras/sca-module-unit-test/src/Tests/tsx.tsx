
// import { JSXView, ReactLike } from 'sc-types-frontend-extras';
// import { ReactNode } from 'react';

// class BaseComponent<P={},S={}> {

//   constructor(props: Readonly<P>){
//     this.props = props
//   }

//   render(): ReactNode {
//     return null
//   }

//   context: any

//   setState(
//     state: S,
//     callback?: () => void
//   ): void {

//   }
//   readonly props: Readonly<{ children?: ReactNode }> & Readonly<P>;
//   state: Readonly<S>;
//   refs: any = null
//   forceUpdate(callBack?: () => void): void { }
// }
  

// class MyComponent extends BaseComponent<{foo:number}> {
//   render(){
//     return <div>{this.props.foo}</div>
//   }
// }

// <MyComponent foo={123}/>