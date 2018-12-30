import ReactLike from './ReactLike';

export default (context: CoolFeature56MainViewContext): JSX.Element =>
  <div className="jojojo">
    <p>{context.name} dreams are: </p>
    <ul>
      {context.dreams.map(dream =>
        <li>
          <strong>{dream.name}</strong>: {dream.description}
        </li>
      )}
    </ul>
  </div>

export interface CoolFeature56MainViewContext {
  name: string
  dreams: Dream[]
}

export interface Dream {
  name: string
  description: string
}
