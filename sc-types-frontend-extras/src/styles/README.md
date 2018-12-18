

 * using jss and css-classes-to-typescript, let users declare which CS sass classes a component extends in the TSX code, examples: `<div extends="sc-primary"><span extends={['sc-important', 'sc-big']}>`. thanks to css-classes-to-typescript it will be type checked, and also using something like the following is possible to typed and programmatically do it: 
 
 ```
const generateClassName: GenerateClassName<AllStylesType> = (rule: Rule, sheet?: StyleSheet<AllStylesType>)=>{  
  return (rule as any).key
}
const sheet = jss.createStyleSheet(allStyles, {generateClassName, })
sheet.addRule('myButton', {'@extends .dsds': '--sc-sass-extends'} as any)

```