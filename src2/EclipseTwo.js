/*******************************************************************************
 * Copyright (c) 2016 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import HSplitPane from './HSplitPane';

export const EclipseTwo = document.registerElement('eclipse-two', class extends HTMLElement {
    attachedCallback() {
        this.innerHTML = `
            <nav class="mainbar">
                <ul>
                    <li><a href="#">Eclipse Two</a></li>
                    <li><a class="active" href="#">Code</a></li>
                    <li><a href="#">Github</a></li>
                </ul>
            </nav>
            <eclipse-hsplitpane>
                <p>Hi there</p>
                <p>From the right side</p>
            </eclipse-hsplitpane>
        `;
    }
});
