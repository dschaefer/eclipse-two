export interface PageProvider {
    label: string;
    create(): HTMLElement;
}

export class UIExtension {
    pageProviders: { [id: string]: PageProvider };

    constructor() {
        this.pageProviders = {};
    }
}
