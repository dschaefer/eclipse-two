// @flow

import React from 'react';
import Monaco from './Monaco';

class App extends React.Component {
    render() {
        return (
            <Monaco
                width="100%"
                height="100%"
                language="javascript"
                value="// type your code..."
            />
        );
    }
};

import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
