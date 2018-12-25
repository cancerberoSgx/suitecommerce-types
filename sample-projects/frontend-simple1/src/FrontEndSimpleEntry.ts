import { ModuleEntryPoint, } from 'sc-types-frontend';
import { Simple1ListView } from './FrontEndSimple1.ListView';

define('FrontEndSimpleEntry', ['FrontEndSimple1.ListView'], (Simple1ListViewConstructor) => ({
    mountToApp(application) {
        application.getLayout().on('afterAppendView', async view => {
            const myView = new Simple1ListViewConstructor()
            const valid = await myView.customValidation()
            if (valid) {
                alert('yahoo')
            }
        })
    }
} as ModuleEntryPoint)
)