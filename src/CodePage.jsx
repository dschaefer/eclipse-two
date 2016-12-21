import React from 'react';
import SplitPane from 'react-split-pane';

import Monaco from './Monaco';
import FileExplorer from './FileExplorer';

export default class CodePage extends React.Component {
    render() {
        return (
            <SplitPane split="vertical" defaultSize={200}>
                <FileExplorer
                />
                <Monaco
                    width="100%"
                    height="100%"
                    language="javascript"
                    value="// type your code..."
                />
            </SplitPane>
        );
    }
}