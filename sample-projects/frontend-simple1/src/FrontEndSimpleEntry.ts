import {View, ExtensionEntryPoint, ViewConstructor} from 'sc-types-frontend'
import { Simple1ListView } from './FrontEndSimple1.ListView';

define<ExtensionEntryPoint, [ViewConstructor]>('FrontEndSimpleEntry', ['FrontEndSimple1.ListView'], (Simple1ListViewConstructor)=>({
    mountToApp(container){
        const view = new Simple1ListViewConstructor()
        const a =new Array()
        container.getComponent('PDP').on('test', ()=>{
            
        })
    }
}))