/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
//@flow
require('./SplitPane');
require('./FileExplorer');
require('./Monaco');

const CodePage = document.registerElement('eclipse-codepage', class extends HTMLDivElement {
    attachedCallback() {
        this.innerHTML = `
            <eclipse-splitpane>
                <eclipse-fileexplorer></eclipse-fileexplorer>
                <monaco-editor></monaco-editor>
            </eclipse-splitpane>
        `;

        this.style.height = '100%';
    }
});

export default CodePage;
