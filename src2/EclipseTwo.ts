import CustomElement from './CustomElement';

export default class EclipseTwo extends CustomElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="mainbar">
                <ul>
                    <li><a href="#">Eclipse Two</a></li>
                    <li><a class="active" href="#">Code</a></li>
                    <li><a href="#">Github</a></li>
                </ul>
            </nav>
            <p>Hi there</p>
        `;
    }
}

CustomElement.registerElement('eclipse-two', EclipseTwo);
