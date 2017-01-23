import { UIExtension, PageProvider } from 'ui/UIExtension';

import CodePage from './CodePage';

let codeUIExtension: UIExtension = {
    pageProviders: [ {
        id: 'code-page',
        label: 'Code',
        create(): HTMLElement {
            return CodePage.createElement();
        }
    } ]
}

export default codeUIExtension;
