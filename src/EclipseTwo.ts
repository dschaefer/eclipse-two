/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import Page from './Page';
import CodePage from './CodePage';
import GithubPage from './GithubPage';
import DemoD3Page from './DemoD3Page';
import Demo3DPage from './Demo3DPage';

class EclipseTwo extends HTMLElement {
    headerList: HTMLUListElement;
    activeTab: HTMLAnchorElement;
    activePage: Page;

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

        const codePage = CodePage.createElement();
        this.addPage(codePage);
        this.addPage(GithubPage.createElement());
        this.addPage(DemoD3Page.createElement());
        this.addPage(Demo3DPage.createElement());

        this.activatePage(codePage);
    }
}

(<any> document).registerElement('eclipse-two', EclipseTwo);
