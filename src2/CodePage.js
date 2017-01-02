//@flow
require('./SplitPane');
require('./FileExplorer');
require('./Monaco');

const CodePage = document.registerElement('eclipse-codepage', class extends HTMLDivElement {
    attachedCallback() {
        this.innerHTML = `
            <eclipse-splitpane>
                <eclipse-fileexplorer></eclipse-fileexplorer>
                <monaco-editor></monaco-editor>
            </eclipse-splitpane>
        `;

        this.style.height = '100%';
    }
});

export default CodePage;
