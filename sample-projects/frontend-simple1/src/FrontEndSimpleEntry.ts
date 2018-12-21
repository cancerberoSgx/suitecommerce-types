import {View, ExtensionEntryPoint} from 'sc-types-frontend'

define<ExtensionEntryPoint, []>('FrontEndSimpleEntry', [], ()=>({
    mountToApp(container){
        container.getComponent('PDP').on('test', ()=>{
            
        })
    }
}))