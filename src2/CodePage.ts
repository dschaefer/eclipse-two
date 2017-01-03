require('./SplitPane');
require('./FileExplorer');
require('./Monaco');

export default class CodePage extends HTMLDivElement {
    static tag = 'eclipse-codepage';

    attachedCallback(): void {
        this.innerHTML = `
            <eclipse-splitpane>
                <eclipse-fileexplorer style="width: 20%;"></eclipse-fileexplorer>
                <monaco-editor></monaco-editor>
            </eclipse-splitpane>
        `;

        this.style.height = '100%';
    }
}

(<any> document).registerElement(CodePage.tag, CodePage);
