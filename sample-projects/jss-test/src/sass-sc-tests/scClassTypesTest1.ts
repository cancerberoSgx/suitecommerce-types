import jss, { Styles, GenerateClassName, Rule } from 'jss';
import { SCClasses } from './cssClasses';


export function buildScRule<Name extends string>(name: string, styles: Partial<Styles<Name>>, classExtends: SCClasses[]=[]): string{


jss.setup()

const sheet = jss.createStyleSheet(styles, {generateClassName, })
const s = sheet.toString()
  return `.${name} `
}


const generateClassName: GenerateClassName = (rule: Rule)=>{
  return (rule as any).key
}

// const sheet = jss.createStyleSheet(allStyles, {generateClassName, })

