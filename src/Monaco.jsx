import React from 'react';
import path from 'path';
import loader from 'monaco-editor/min/vs/loader';

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

        loader.require(['vs/editor/editor.main'], function() {
            var editor = monaco.editor.create(document.getElementById('container'), {
                value: [
                        'function x() {',
                        '\tconsole.log("Hello world!");',
                        '}'
                    ].join('\n'),
                language: 'javascript'
            });
        });
    }

    render() {
        var style = {
            width: "100%",
            height: "100%"
        };
        return <div id="container" style={style}></div>;
    }
}