import Page from 'ui/Page';

export interface PageProvider {
    id: string;
    name: string;
    create(): Page;
}

export interface UIExtension {
    pageProviders: Array<PageProvider>;
}
