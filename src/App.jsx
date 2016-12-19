// @flow

import React from 'react';
import Monaco from './Monaco';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SplitPane from 'react-split-pane';

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
                <SplitPane split="vertical">
                    <div><p>This is a bunch of stuff</p></div>
                    <Monaco
                        width="100%"
                        height="100%"
                        language="javascript"
                        value="// type your code..."
                    />
                </SplitPane>
            </div>
        );
    }
};

import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
