import * as loader from 'monaco-editor/min/vs/loader';
import * as path from 'path';

const basePath = path.resolve(path.join(__dirname, '../node_modules/monaco-editor/min')).replace(/\\/g, '/').replace(/ /g, '%20');
const baseUrl = ('/' === basePath.charAt(0) ? 'file://' : 'file:///') + basePath;

loader.require.config({
    baseUrl: baseUrl
});

declare var monaco: any;

class MonacoEditor extends HTMLElement {
    editor: any;

    static tag = 'monaco-editor';

    createEditor() {
        this.editor = monaco.editor.create(this, {
            value: `console.log()\n`,
            language: 'javascript'
        });
    }

    attachedCallback() {
        if (typeof monaco === 'undefined') {
            // workaround monaco-css not understanding the environment
            (<any> self).module = undefined;

            // workaround monaco-typescript not understanding the environment
            (<any> self).process.browser = true;

            loader.require(['vs/editor/editor.main'], () => this.createEditor());
        } else {
            this.createEditor();
        }
    }
});

(<any> document).registerElement(MonacoEditor.tag, MonacoEditor);
