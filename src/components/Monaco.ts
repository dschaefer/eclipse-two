/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />
import { Editor } from 'ui/Editor';
import customElements from 'ui/customElements';

import * as loader from 'monaco-editor/min/vs/loader';

import * as electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const basePath = path.resolve(path.join(electron.remote.app.getAppPath(), 'node_modules/monaco-editor/min')).replace(/\\/g, '/').replace(/ /g, '%20');
const baseUrl = ('/' === basePath.charAt(0) ? 'file://' : 'file:///') + basePath;

loader.require.config({
    baseUrl: baseUrl
});

export default class MonacoEditor extends Editor {
    static tag = 'monaco-editor';

    editor: monaco.editor.IStandaloneCodeEditor;

    openFile(filePath: string) {
        super.openFile(filePath);

        fs.readFile(filePath, 'UTF-8', (err, data) => {
            if (typeof monaco === 'undefined') {
                // workaround monaco-css not understanding the environment
                (<any> self).module = undefined;

                // workaround monaco-typescript not understanding the environment
                (<any> self).process.browser = true;

                loader.require(['vs/editor/editor.main'], () => this.createEditor(data));
            } else {
                this.createEditor(data);
            }
        });
    }

    createEditor(contents: string) {
        if (this.editor) {
            this.editor.dispose();
        }
        
        var language: string;

        switch (path.extname(this.filePath)) {
            case '.js':
                language = 'javascript';
                break;
            case '.html':
                language = 'html';
                break;
            case '.css':
                language = 'css';
                break;
            case '.json':
                language = 'json';
                break;
            case '.ts':
                language = 'typescript';
                break;
            case '.md':
                language = 'markdown';
                break;
        }

        this.editor = monaco.editor.create(this, {
            value: contents,
            language: language,
            theme: 'vs-dark'
        });
    }

    connectedCallback(): void {
        this.style.height = '100%';
        this.style.width = '100%';
    }
}

customElements.define(MonacoEditor.tag, MonacoEditor);
