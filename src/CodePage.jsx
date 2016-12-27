import React from 'react';
import SplitPane from 'react-split-pane';

import Monaco from './Monaco';
import FileExplorer from './FileExplorer';

export default class CodePage extends React.Component {
    state: {
        path: string
    }

    constructor(props: any) {
        super(props);

        this.onOpen = this.onOpen.bind(this);
        this.state = { path: '' }
    }

    onOpen(path: string) {
        this.setState({ path });
    }

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        return (
            <div style={style}>
                <SplitPane split="vertical" defaultSize={200}>
                    <FileExplorer onOpen={ this.onOpen }
                    />
                    <Monaco path={ this.state.path }
                    />
                </SplitPane>
            </div>
        );
    }
}