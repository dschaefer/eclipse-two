import React from 'react';
import path from 'path';
import fs from 'fs';
import loader from 'monaco-editor/min/vs/loader';

declare var monaco;

export default class Monaco extends React.Component {
    constructor(props) {
        super(props);

        var baseUrl = 'file://' + path.resolve(path.join(__dirname, '../node_modules/monaco-editor/min')).replace(/\\/g, '/');
        loader.require.config({
            baseUrl: baseUrl
        });

        // workaround monaco-css not understanding the environment
        self.module = undefined;

        // workaround monaco-typescript not understanding the environment
        self.process.browser = true;

        this.path = '';
    }

    createEditor() {
        this.editor = monaco.editor.create(document.getElementById('container'), {
            value: this.props.path,
            language: 'javascript'
        });
    }

    updateDimensions() {
        this.editor.layout();
    }

    componentDidMount() {
        if (typeof monaco === 'undefined') {
            loader.require(['vs/editor/editor.main'], () => this.createEditor())
        } else {
            this.createEditor();
        }
        window.addEventListener("resize", () => this.updateDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.updateDimensions());
    }

    render() {
        const style = {
            width: "100%",
            height: "100%"
        };

        if (this.path != this.props.path) {
            fs.readFile(this.props.path, (err, data) => {
                const model = monaco.editor.createModel(data.toString(), 'javascript');
                this.editor.setModel(model);
            })
        }

        return <div id="container" style={style}></div>;
    }
}

Monaco.propTypes = {
    path: React.PropTypes.string
}