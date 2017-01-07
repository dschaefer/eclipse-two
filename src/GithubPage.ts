/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import Page from './Page';

export default class GithubPage extends Page {
    static tag = 'eclipse-github';

    static createElement(): GithubPage {
        return <GithubPage> document.createElement(GithubPage.tag);
    }

    getName(): string {
        return 'Github';
    }

    attachedCallback(): void {
        const webview = document.createElement('webview');
        webview.setAttribute('src', 'https://github.com/dschaefer/eclipse-two');
        webview.style.height = '100%';
        this.appendChild(webview);
    }
}

(<any> document).registerElement(GithubPage.tag, GithubPage);
