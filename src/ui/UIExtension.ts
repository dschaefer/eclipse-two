export interface PageProvider {
    id: string;
    label: string;
    create(): HTMLElement;
}

export interface UIExtension {
    pageProviders: Array<PageProvider>;
}
