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

import TabFolder from 'components/TabFolder';

import { UIExtension, PageProvider } from 'ui/UIExtension';

import GithubPage from 'pages/GithubPage';
import DemoD3Page from 'pages/DemoD3Page';
import Demo3DPage from 'pages/Demo3DPage';

class EclipseTwo extends TabFolder {
    static tag = 'eclipse-two';

    static createElement(): EclipseTwo {
        return <EclipseTwo> document.createElement(EclipseTwo.tag);
    }

    extensions: { [id: string]: UIExtension };

    loadExtensions(): void {
        this.extensions = {};
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
                    this.extensions[pkg.name] = extension;
                }
            }
        });
    }

    createdCallback(): void {
        this.loadExtensions();
    }

    attachedCallback(): void {
        super.attachedCallback();

        // Temporary until we get a real dashboard
        const dashboard = document.createElement('div');
        dashboard.setAttribute(TabFolder.attributeLabel, 'Eclipse Two');
        this.appendChild(dashboard);

        // Load Code page from extension
        const codeProvider = this.extensions['eclipse-code'].pageProviders['code-page'];
        const codePage = <HTMLElement> codeProvider.create();
        codePage.setAttribute(TabFolder.attributeLabel, codeProvider.label);
        // Make active for now
        codePage.classList.add(TabFolder.classActive);
        this.appendChild(codePage);

        const githubPage = GithubPage.createElement();
        githubPage.setAttribute(TabFolder.attributeLabel, 'Github');
        this.appendChild(githubPage);

        const demoD3Page = DemoD3Page.createElement();
        demoD3Page.setAttribute(TabFolder.attributeLabel, 'D3 Demo');
        this.appendChild(demoD3Page);

        const demo3DPage = Demo3DPage.createElement();
        demo3DPage.setAttribute(TabFolder.attributeLabel, '3D Demo');
        this.appendChild(demo3DPage);
    }
}

(<any> document).registerElement(EclipseTwo.tag, EclipseTwo);
