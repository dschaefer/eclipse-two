/*******************************************************************************
 * Copyright (c) 2016 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/

const HSplitter = document.registerElement('eclipse-hsplitter', class extends HTMLElement {
});

export const HSplitPane = document.registerElement('eclipse-hsplitpane', class extends HTMLElement {
    attachedCallback() {
        this.left = this.children[0];
        this.right = this.children[1];

        this.splitter = new HSplitter;
        this.insertBefore(this.splitter, this.right);
    }
});
