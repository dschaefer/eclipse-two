/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import * as path from 'path';
import * as fs from 'fs';

export default class FileExplorer extends HTMLUListElement {
    static tag = 'eclipse-fileexplorer';
    static folderClosed = 'fa-folder';
    static folderOpen = 'fa-folder-open';
    static fileIcon = 'fa-file-o';

    static createElement(): FileExplorer {
        return <FileExplorer> document.createElement(FileExplorer.tag);
    }

    clickNode(e: MouseEvent) {
        const entry = (<HTMLElement> e.currentTarget);
        const li = entry.parentElement;
        const span = entry.children[0];
        const filePath = li.getAttribute('filePath');
        if (span.classList.contains(FileExplorer.folderClosed)) {
            const ul = document.createElement('ul');
            ul.classList.add('fa-ul');
            li.appendChild(ul);

            fs.readdir(filePath, (err, files) => {
                files.map(file => {
                    if (file.charAt(0) !== '.') {
                        ul.appendChild(this.createFileNode(path.resolve(filePath, file), file));
                    }
                });

                span.classList.remove(FileExplorer.folderClosed);
                span.classList.add(FileExplorer.folderOpen);
            });
        } else if (span.classList.contains(FileExplorer.folderOpen)) {
            li.children[1].remove();

            span.classList.remove(FileExplorer.folderOpen);
            span.classList.add(FileExplorer.folderClosed);
        } else {
            const openEvent = new CustomEvent('open-file', {
                detail: {
                    filePath: filePath
                },
                bubbles: true,
                cancelable: true
            })
            entry.dispatchEvent(openEvent);
        }
    }

    createFileNode(filePath: string, fileName: string): HTMLLIElement {
        const li = document.createElement('li');
        li.setAttribute('filePath', filePath);

        const isDir = fs.lstatSync(filePath).isDirectory();

        const entry = document.createElement('div');
        entry.addEventListener('click', (e) => this.clickNode(e));
        li.appendChild(entry);

        const span = document.createElement('span');
        span.classList.add('fa-li', 'fa', isDir ? FileExplorer.folderClosed : FileExplorer.fileIcon,
            isDir? 'folder' : 'file');
        entry.appendChild(span);

        const name = document.createElement('a');
        name.href = '#';
        name.appendChild(document.createTextNode(fileName));
        entry.appendChild(name);

        return li;
    }

    attachedCallback(): void {
        this.style.overflow = 'auto';
        this.style.height = '100%';
        this.style.width = '20%';
        this.style.fontSize = '14px';
        this.style.whiteSpace = 'nowrap';

        const ul = document.createElement('ul');
        ul.classList.add('fa-ul');
        this.appendChild(ul);

        const myroot = path.resolve(__dirname, '..');
        ul.appendChild(this.createFileNode(myroot, path.basename(myroot)));
    }
}

(<any> document).registerElement(FileExplorer.tag, FileExplorer);
