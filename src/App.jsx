/*******************************************************************************
 * Copyright (c) 2016 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import CodePage from './CodePage';

class App extends React.Component {
    render() {
        var appStyle = {
            width: "100%",
            height: "100%"
        }
        return (
            <div style={appStyle}>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Eclipse Two</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}>Code</NavItem>
                        <NavItem eventKey={2}>Github</NavItem>
                    </Nav>
                </Navbar>
                <CodePage/>
            </div>
        );
    }
};

import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
