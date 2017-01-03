import * as path from 'path';

class FileNode extends HTMLLIElement {
    filePath: string;

    static tag: string = 'eclipse-filenode';

    static createElement(): FileNode {
        return <FileNode> document.createElement(FileNode.tag);
    }

    attachedCallback(): void {
        const span = document.createElement('span');
        span.classList.add('fa-li', 'fa', 'fa-minus-square-o');
        this.appendChild(span);

        const name = document.createElement('a');
        name.href = '#';
        name.appendChild(document.createTextNode(path.basename(this.filePath)));
        this.appendChild(name);
    }
}

(<any> document).registerElement(FileNode.tag, FileNode);

export default class FileExplorer extends HTMLUListElement {
    static tag = 'eclipse-fileexplorer';

    createElement(): FileExplorer {
        return (<any> document).createElement(FileExplorer.tag);
    }

    attachedCallback(): void {
        this.style.overflow = 'auto';
        this.style.height = '100%';
        this.style.fontSize = '14px';
        this.classList.add('fa-ul');

        const firstRoot = FileNode.createElement();
        firstRoot.filePath = 'C:\\Users\\dschaefer';
        this.appendChild(firstRoot);
    }
}

(<any> document).registerElement(FileExplorer.tag, FileExplorer);
