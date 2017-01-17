/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import * as electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';

// Neat trick to add dist to the node module path
// Will need to do this for user local extensions as well
require('app-module-path').addPath(path.resolve(electron.remote.app.getAppPath(), 'dist'));

import { UIExtension, PageProvider } from 'ui/UIExtension';
import Page from 'ui/Page';

import GithubPage from 'pages/GithubPage';
import DemoD3Page from 'pages/DemoD3Page';
import Demo3DPage from 'pages/Demo3DPage';

class EclipseTwo extends HTMLElement {
    headerList: HTMLUListElement;
    activeTab: HTMLAnchorElement;
    activePage: Page;
    extensions: Array<UIExtension>;

    addPage(page: Page) {
        const name = page.getName();

        const li = document.createElement('li');
        this.headerList.appendChild(li);

        const a = document.createElement('a');
        a.href = '#';
        a.setAttribute('page-name', name);
        a.appendChild(document.createTextNode(name));
        a.addEventListener('click', () => this.activatePage(page));
        li.appendChild(a);
        this.appendChild(page);

        page.style.display = 'none';
    }

    activatePage(page: Page) {
        if (this.activeTab) {
            this.activeTab.classList.remove('active');
            this.activePage.style.display = 'none';
        }
        this.activeTab = <HTMLAnchorElement> this.headerList.querySelector(`a[page-name="${page.getName()}"]`);
        this.activeTab.classList.add('active');
        this.activePage = page;
        this.activePage.style.display = 'inline';
    }

    loadExtensions(): void {
        this.extensions = [];
        const extDir = path.resolve(electron.remote.app.getAppPath(), "dist/extensions");
        const srcDir = path.resolve(electron.remote.app.getAppPath(), "src/extensions");
        fs.readdirSync(extDir).map(dir => {
            const myExtDir = path.resolve(extDir, dir);
            const mySrcDir = path.resolve(srcDir, dir);
            const extPackage = path.resolve(mySrcDir, 'package.json');
            if (fs.existsSync(extPackage)) {
                const pkg = JSON.parse(fs.readFileSync(extPackage).toString());
                if (pkg.uiExtension) {
                    const extension: UIExtension = require(path.resolve(myExtDir, pkg.uiExtension)).default;
                    this.extensions.push(extension);
                    this.extensions[pkg.name] = extension;

                    extension.pageProviders.map(provider => {
                        extension.pageProviders[provider.id] = provider;
                    });
                }
            }
        })

    }

    createdCallback(): void {
        this.loadExtensions();
    }

    attachedCallback(): void {
        const nav = document.createElement('nav');
        nav.classList.add('mainbar');
        this.appendChild(nav);

        this.headerList = document.createElement('ul');
        nav.appendChild(this.headerList);

        const li1 = document.createElement('li');
        this.headerList.appendChild(li1);
        const a1 = document.createElement('a');
        a1.href = '#';
        a1.appendChild(document.createTextNode('Ecilpse Two'));
        li1.appendChild(a1);

        const codePage = this.extensions['eclipse-code'].pageProviders['code-page'].create();
        this.addPage(codePage);
        this.addPage(GithubPage.createElement());
        this.addPage(DemoD3Page.createElement());
        this.addPage(Demo3DPage.createElement());

        this.activatePage(codePage);
    }
}

(<any> document).registerElement('eclipse-two', EclipseTwo);
