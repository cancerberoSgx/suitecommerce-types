import jss, { StyleSheet, GenerateClassName, Rule } from 'jss'
// import preset from 'jss-preset-default'
import { Style } from 'jss/css';

jss.setup()

type MyStyle1 = { 
  myButton: Style
}

// Create your style.
const style1: MyStyle1 = {
  myButton: {
    border: '1px solid pink'
  }
}

type MyStyle2 = { 
  myButton2: Style
}

const style2: MyStyle2 = {
  myButton2: {
    border: '1px solid pink'
  }
}

const allStyles = {...style1, ...style2}
type AllStylesType = keyof (typeof allStyles)

const generateClassName: GenerateClassName<AllStylesType> = (rule: Rule, sheet?: StyleSheet<AllStylesType>)=>{  
  return (rule as any).key
}
const sheet = jss.createStyleSheet(allStyles, {generateClassName, })
sheet.addRule('myButton', {'@extends .dsds': '--sc-sass-extends'} as any)

const s = sheet.toString()

console.log(s);
