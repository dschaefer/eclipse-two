/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
//@flow
document.registerElement('eclipse-fileexplorer', class extends HTMLElement {
    attachedCallback() {
        this.innerHTML = `
            <ul class="fa-ul">
                <li>
                    <span class="fa-li fa fa-plus-square-o"></span>
                    <a href="#">/Users/dschaefer</a>
                    <ul class="fa-ul">
                        <li>
                            <span class="fa-li fa fa-file"></span>
                            <a href="#">myfile.txt</a>
                        </li>
                    </ul>
                </li>
            <ul>
        `;

        this.style.overflow = 'auto';
        this.style.height = '100%';
    }
});