require('./CodePage');

class EclipseTwo extends HTMLElement {
    attachedCallback(): void {
        this.innerHTML = `
            <nav class="mainbar">
                <ul>
                    <li><a href="#">Eclipse Two</a></li>
                    <li><a class="active" href="#">Code</a></li>
                    <li><a href="#">Github</a></li>
                </ul>
            </nav>
            <eclipse-codepage></eclipse-codepage>
        `;
    }
}

(<any> document).registerElement('eclipse-two', EclipseTwo);
