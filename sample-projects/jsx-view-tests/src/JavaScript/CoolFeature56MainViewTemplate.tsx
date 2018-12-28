import ReactLike  from './ReactLike';

export default (context:CoolFeature56MainViewContext): JSX.Element =>
  <div className="jojojo">
    <p>name: {context.name}</p>
    
  </div>


export interface CoolFeature56MainViewContext {
  name: string;
}

