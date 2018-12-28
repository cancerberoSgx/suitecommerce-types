import { TemplateContext } from 'sc-types-frontend';

export type JSXTemplate<Context extends TemplateContext> = (context: Context) => JSX.Element
