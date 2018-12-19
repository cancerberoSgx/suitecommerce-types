import { ReactLikeRender } from './ReactLike';

export default {
  renderDOM(parent: HTMLElement, el: JSX.Element): void {
    parent.appendChild(el as any);
  },
  renderJQuery(parent: JQuery<HTMLElement>, el: JSX.Element): void {
    parent.append(jQuery(el as any));
  }
} as ReactLikeRender;
