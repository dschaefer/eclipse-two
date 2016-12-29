declare function registerElement(tag: string, cls: any);

export default class CustomElement extends HTMLElement {
    connectedCallback(): void { }

    attachedCallback(): void {
        this.connectedCallback();
    }

    static registerElement(tag: string, cls: any) {
        registerElement(tag, cls);
    }

}
