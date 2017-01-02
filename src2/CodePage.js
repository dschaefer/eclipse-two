//@flow
require('./SplitPane');
require('./Monaco');

const CodePage = document.registerElement('eclipse-codepage', class extends HTMLDivElement {
    attachedCallback() {
        this.innerHTML = `
            <eclipse-splitpane>
                <p>Left side</p>
                <monaco-editor></monaco-editor>
            </eclipse-splitpane>
        `;

        this.style.height = '100%';
    }
});

export default CodePage;
