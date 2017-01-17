import { UIExtension, PageProvider } from 'ui/UIExtension';
import Page from 'ui/Page';

import CodePage from './CodePage';

let codeUIExtension: UIExtension = {
    pageProviders: [ {
        id: 'code-page',
        name: 'Code',
        create(): Page {
            return CodePage.createElement();
        }
    } ]
}

export default codeUIExtension;
