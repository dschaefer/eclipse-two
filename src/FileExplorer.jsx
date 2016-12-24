// @flow
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';
import fs from 'fs';
import path from 'path';

class FileData {
    name: string;
    filepath: string;
    children: ?[ FileData ];
    hasChildren: boolean;

    constructor(name, filepath, hasChildren) {
        this.name = name;
        this.filepath = filepath;
        this.hasChildren = hasChildren;
    }

    getFile(filepath: string): ?FileData {
        if (filepath == this.filepath) {
            return this;
        }

        if (this.hasChildren && this.children
                && filepath.startsWith(this.filepath)) {
            for (let i = 0; i < this.children.length; i++) {
                const file = this.children[i].getFile(filepath);
                if (file) {
                    return file;
                }
            }
        }

        return null;
    }
}

export default class FileExplorer extends React.Component {
    state: {
        fileData: [ ];
    };
   
    constructor(props: any) {
        super(props);

        const fileData = [ ];

        const home = process.env[ 'HOME' ];
        if (home) {
            const file = new FileData(home, home, true);
            fileData.push(file);
        }

        this.state = { fileData: fileData };
    }

    getFile(path: string) {
        for (let i = 0; i < this.state.fileData.length; i++) {
            const file = this.state.fileData[i].getFile(path);
            if (file) {
                return file;
            }
        }

        return null;
    }

    onLoadData(node: TreeNode) {
        return new Promise((resolve) => {
            const filepath = node.props.eventKey;
            const fileData = [ ...this.state.fileData ];
            const nodeData = this.getFile(filepath);
            if (nodeData) {
                nodeData.children = [ ];
                fs.readdir(filepath, (err, files) => {
                    files.map((childname) => {
                        if (!childname.startsWith('.')) {
                            const childpath = path.resolve(filepath, childname);
                            nodeData.children.push(new FileData(childname, childpath,
                                fs.lstatSync(childpath).isDirectory()));
                        }
                    });
                    this.setState({ fileData: fileData });
                    resolve();
                });
            }
        });
    }

    render() {
        const getNodes = (node: FileData) => {
            if (node.children) {
                return <TreeNode title={node.name} key={node.filepath} isLeaf={!node.hasChildren}>
                    {node.children.map((file) => getNodes(file))}
                </TreeNode>;
            } else {
                return <TreeNode title={node.name} key={node.filepath} isLeaf={!node.hasChildren}/>;
            }
        }

        const rootNodes = this.state.fileData.map((file) => getNodes(file));

        const style = {
            height: '100%',
            width: '100%',
            overflow: 'auto'
        }

        return (
            <div style={style}>
                <Tree showLine loadData={(node) => this.onLoadData(node)}>
                    {rootNodes}
                </Tree>
            </div>
        );
    }
}