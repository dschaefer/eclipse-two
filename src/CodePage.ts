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
import { Editor, EditorTab } from './Editor';
import MonacoEditor from './Monaco';
import * as path from 'path';

export default class CodePage extends Page {
    static tag = 'eclipse-codepage';

    static createElement() : CodePage {
        return <CodePage> document.createElement(CodePage.tag);
    }

    tabList: HTMLUListElement;
    editorSpace: HTMLElement;
    activeEditor: Editor;

    getName(): string {
        return 'Code';
    }

    activateEditor(editor: Editor) {
        if (this.activeEditor) {
            this.activeEditor.active = false;
        }

        this.activeEditor = editor;
        this.activeEditor.active = true;
    }

    openEditor(filePath: string) {
        const name = path.basename(filePath);

        const monaco = MonacoEditor.createElement();
        this.editorSpace.appendChild(monaco);
        monaco.openFile(filePath);
        monaco.addEventListener('close-editor', (e: CustomEvent) => {
            e.stopPropagation();
            const editor: Editor = e.detail.editor;
            if (editor === this.activeEditor) {
                for (var i = 1; i < this.editorSpace.children.length; ++i) {
                    if (editor !== this.editorSpace.children[i]) {
                        this.activateEditor(<Editor> this.editorSpace.children[i]);
                        break;
                    }
                }
            }

            this.editorSpace.removeChild(editor);
            this.tabList.removeChild(editor.editorTab);
        });

        const tab = monaco.editorTab;
        this.tabList.appendChild(tab);
        tab.addEventListener('click', () => this.activateEditor(monaco));

        this.activateEditor(monaco);
    }

    attachedCallback(): void {
        const splitPane = SplitPane.createElement();

        const fileExplorer = FileExporer.createElement();
        splitPane.appendChild(fileExplorer);

        fileExplorer.addEventListener('open-file', (e: CustomEvent) => {
           e.stopPropagation();
           this.openEditor(e.detail.filePath);
        });

        this.editorSpace = document.createElement('div');
        this.editorSpace.style.height = '100%';
        splitPane.appendChild(this.editorSpace);

        // Editor tabs
        const nav = document.createElement('nav');
        this.editorSpace.appendChild(nav);
        nav.classList.add('editortabs');
        this.tabList = document.createElement('ul');
        nav.appendChild(this.tabList);

        this.appendChild(splitPane);
        this.style.height = '100%';
    }
}

(<any> document).registerElement(CodePage.tag, CodePage);
