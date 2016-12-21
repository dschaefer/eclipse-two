// @flow
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';

export default class FileExplorer extends React.Component {
    render() {
        return (
            <Tree showLine defaultExpandAll>
                <TreeNode title="project1">
                    <TreeNode title="index.html"/>
                    <TreeNode title="main.js"/>
                    <TreeNode title="package.json"/>
                </TreeNode>
            </Tree>
        );
    }
}