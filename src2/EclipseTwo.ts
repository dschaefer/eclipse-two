/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
require('./CodePage');

class EclipseTwo extends HTMLElement {
    attachedCallback(): void {
        this.innerHTML = `
            <nav class="mainbar">
                <ul>
                    <li><a href="#">Eclipse Two</a></li>
                    <li><a class="active" href="#">Code</a></li>
                    <li><a href="#">Github</a></li>
                </ul>
            </nav>
            <eclipse-codepage></eclipse-codepage>
        `;
    }
}

(<any> document).registerElement('eclipse-two', EclipseTwo);
