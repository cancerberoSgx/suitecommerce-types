user will be able to 

import {Utils, jQuery} from 'suitecommerce'

parts:

 * sc modules exposed as ES modules with bindings so user can import
 * typescript plugin or postprocerss that will replace

```
import {Utils, jQuery} from 'suitecommerce'
export const MyCoolModuleEntry:ExtensionEntryPoint = {
    mountToApp(container){
        container.getComponent('PDP')
        //...
    }
}
```

to

```
define('MyCoolModuleEntry', ['Utils', 'jQuery'], (Utils, jQuery)=>{
return {
    mountToApp(container){
        container.getComponent('PDP')
        //...
    }
}
})

```

This last one is difficult. Implies:

 * extract named modules from import statement
 * remove import statement
 * extract this module name from exported variable declaration
 * remove export statement 
 * add a define statement that has all declared dependencies in original import statement
 * define handler to return the same object exported

Limitations: user cannot import other things thansuitecommerce - i.e it wont be able to install other libraries w npm and use them... Wer could work on this later that should be utimate objective...

possible sollution

a typescript plugin that 