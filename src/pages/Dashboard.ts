/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import customElements from 'ui/customElements';

export default class Dashboard extends HTMLElement {
    static tag = 'two-dashboard';

    connectedCallback() {
        this.textContent = `
            This will contain the Two dashboard.
            It will provide a grid of items that show status on various things the user cares about
            and serve as a starting point into various actions the user wants to perform.
            If you remember iGoogle, it's kinda like that.
            `;
    }
}

customElements.define(Dashboard.tag, Dashboard);