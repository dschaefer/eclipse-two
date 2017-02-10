import { UIExtension, PageProvider } from 'ui/UIExtension';

import CodePage from './CodePage';

let codeUIExtension = new UIExtension();
codeUIExtension.pageProviders['code-page'] = {
    label: 'Code',
    create(): HTMLElement {
        return new CodePage();
    }
}

export default codeUIExtension;
