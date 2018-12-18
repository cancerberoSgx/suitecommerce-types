import jss, { StyleSheet } from 'jss'
import preset from 'jss-preset-default'
import { Style } from 'jss/css';

jss.setup(preset())

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

// Compile styles, apply plugins.
const sheet = jss.createStyleSheet({...style1, ...style2})

// // If you want to render on the client, insert it into DOM.
// sheet.attach()

// If you want to render server-side, get the CSS text.
const s = sheet.toString()

console.log(s);
