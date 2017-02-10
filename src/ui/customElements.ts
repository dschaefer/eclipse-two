interface CustomElementsOptions {
    extends: string;
}

interface CustomElements {
    define(tag: string, c: typeof HTMLElement, options?: CustomElementsOptions);
}

declare const customElements: CustomElements;

export default customElements;