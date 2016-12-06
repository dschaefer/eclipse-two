class EclipseIDE extends HTMLElement {
    constructor() {
        super();
    }

    attachedCallback() : void {
        this.innerHTML = `
            <div class="container">
                <h2>Welcome to Eclipse Two</h2>
                <p>The next-generation Eclipse IDE</p>
            </div>
        `;
    }
}

declare function registerElement(tag: string, cls: any);
registerElement('eclipse-ide', EclipseIDE);
