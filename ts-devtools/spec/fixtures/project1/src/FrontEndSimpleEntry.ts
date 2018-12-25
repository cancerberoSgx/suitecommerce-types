import { Application } from 'sc-types-frontend';
import { FrontEndSimple1ListView } from './FrontEndSimple1.ListView';

export const FrontEndSimpleEntry = {
    mountToApp(application: Application) {
        application.getLayout().on('afterAppendView', async view => {
            const myView = new FrontEndSimple1ListView() as any
            const valid = await myView.customValidation()
            if (valid) {
                alert('yahoo')
            }
        })
    }
}
