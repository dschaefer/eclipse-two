/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import Page from './Page';
import SplitPane from './SplitPane';
import FileExporer from './FileExplorer';
import MonacoEditor from './Monaco';

export default class CodePage extends Page {
    static tag = 'eclipse-codepage';

    static createElement() : CodePage {
        return <CodePage> document.createElement(CodePage.tag);
    }

    getName(): string {
        return 'Code';
    }

    attachedCallback(): void {
        const splitPane = SplitPane.createElement();

        const fileExplorer = FileExporer.createElement();
        splitPane.appendChild(fileExplorer);

        const monaco = MonacoEditor.createElement();
        splitPane.appendChild(monaco);

        fileExplorer.addEventListener('open-file', (e: CustomEvent) => {
            e.stopPropagation();
            monaco.openFile(e.detail.filePath);
        });

        this.appendChild(splitPane);

        this.style.height = '100%';
    }
}

(<any> document).registerElement(CodePage.tag, CodePage);
