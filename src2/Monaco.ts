/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
/// <reference path="../node_modules/monaco-editor/monaco.d.ts" />
import * as loader from 'monaco-editor/min/vs/loader';
import * as path from 'path';
import * as fs from 'fs';

const basePath = path.resolve(path.join(__dirname, '../node_modules/monaco-editor/min')).replace(/\\/g, '/').replace(/ /g, '%20');
const baseUrl = ('/' === basePath.charAt(0) ? 'file://' : 'file:///') + basePath;

loader.require.config({
    baseUrl: baseUrl
});

export default class MonacoEditor extends HTMLElement {
    static tag = 'monaco-editor';

    editor: monaco.editor.IStandaloneCodeEditor;

    static createElement(): MonacoEditor {
        return <MonacoEditor> document.createElement(MonacoEditor.tag);
    }

    openFile(filePath: string) {
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
        
        this.editor = monaco.editor.create(this, {
            value: contents,
            language: 'javascript',
            theme: 'vs-dark'
        });
    }

    attachedCallback(): void {
        this.style.height = '100%';
        this.style.width = '100%';
    }
}

(<any> document).registerElement(MonacoEditor.tag, MonacoEditor);
