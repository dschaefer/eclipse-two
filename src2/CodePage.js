//@flow
require('./SplitPane');

const CodePage = document.registerElement('eclipse-codepage', class extends HTMLDivElement {
    attachedCallback() {
        this.innerHTML = `
            <eclipse-splitpane>
                <p>Left side</p>
                <p>The right side is way better</p>
                <p>Lets try a third</p>
            </eclipse-splitpane>
        `;

        this.style.height = '100%';
    }
});

export default CodePage;
