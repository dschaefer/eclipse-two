/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import Page from '../ui/Page';

export default class GithubPage extends Page {
    static tag = 'eclipse-github';

    static createElement(): GithubPage {
        return <GithubPage> document.createElement(GithubPage.tag);
    }

    getName(): string {
        return 'Github';
    }

    attachedCallback(): void {
        const home = 'https://github.com/dschaefer/eclipse-two';
        const controls = document.createElement('div');
        controls.id = 'github-controls';
        this.appendChild(controls);

        const webview: any = document.createElement('webview');
        webview.setAttribute('src', home);
        webview.setAttribute('preload', '../../dist/pages/githubPreload.js');
        webview.style.height = '100%';
        this.appendChild(webview);

        const backButton = document.createElement('button');
        backButton.id = 'github-back';
        backButton.title = 'Go Back';
        //backButton.disabled = true;
        backButton.textContent = '\u25c0';
        backButton.onclick = () => {
            webview.goBack();
        };
        controls.appendChild(backButton);

        const forwardButton = document.createElement('button');
        forwardButton.id = 'github-forward';
        forwardButton.title = 'Go Forward';
        //forwardButton.disabled = true;
        forwardButton.textContent = '\u25b6';
        forwardButton.onclick = () => webview.goForward();
        controls.appendChild(forwardButton);

        const homeButton = document.createElement('button');
        homeButton.id = 'github-home';
        homeButton.title = 'Go Home';
        homeButton.textContent = '\u2302';
        homeButton.onclick = () => webview.src = home;
        controls.appendChild(homeButton);

        const reloadButton = document.createElement('button');
        reloadButton.id = 'github-reload';
        reloadButton.title = 'Reload';
        reloadButton.textContent = '\u27f3';
        controls.appendChild(reloadButton);

        const locationForm = document.createElement('form');
        locationForm.id = 'github-location-form';
        controls.appendChild(locationForm);

        const locationDiv = document.createElement('div');
        locationDiv.id = 'github-center-column';
        locationForm.appendChild(locationDiv);

        const locationInput = document.createElement('input');
        locationInput.id = 'github-location';
        locationInput.type = 'text';
        locationInput.value = 'http://www.github.com/';
        locationForm.onsubmit = (e) => {
            e.preventDefault();
            webview.src = locationInput.value;
        }
        locationDiv.appendChild(locationInput);

        const locationSubmit = document.createElement('input');
        locationSubmit.type = 'submit';
        locationSubmit.value = 'Go';
        locationForm.appendChild(locationSubmit);

        /*
        webview.addEventListener('dom-ready', () => {
            webview.openDevTools()
        });
        */
    }
}

(<any> document).registerElement(GithubPage.tag, GithubPage);
