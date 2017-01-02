/*******************************************************************************
 * Copyright (c) 2016 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import loader from 'monaco-editor/min/vs/loader';
import path from 'path';

const baseUrl = 'file://' + path.resolve(path.join(__dirname, '../node_modules/monaco-editor/min')).replace(/\\/g, '/');
loader.require.config({
    baseUrl: baseUrl
});


document.registerElement('monaco-editor', class extends HTMLElement {
    createEditor() {
        this.editor = monaco.editor.create(this, {
            value: `console.log()\n`,
            language: 'javascript'
        });
    }

    attachedCallback() {
        if (typeof monaco === 'undefined') {
            // workaround monaco-css not understanding the environment
            self.module = undefined;

            // workaround monaco-typescript not understanding the environment
            self.process.browser = true;

            loader.require(['vs/editor/editor.main'], () => this.createEditor());
        } else {
            this.createEditor();
        }
    }
});
