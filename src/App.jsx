// @flow
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
