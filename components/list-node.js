import React from 'react';
import classNames from 'classnames';

import Editable from './editable';
import listActions from '../actions/list-actions';
import ItemsToCheck from '../components/items-to-check';



require('../styles/list-node.styl');

var ListNode = React.createClass({
    render () {
        return (
            <div className = {classNames({node: true, 'indented-node': this.props.depth > 0})}>
                <Editable initialText={this.props.node.code} onChange={this.nodeChanged.bind(this, 'code')}/>&nbsp;-&nbsp;
                <Editable initialText={this.props.node.label} onChange={this.nodeChanged.bind(this, 'label')}/>
                {this.props.node.children.map(node => {
                    return <ListNode listId={this.props.listId} depth={this.props.depth + 1} key={node.code} node={node} revisionLabels={this.props.revisionLabels}></ListNode>;
                })}
                <ItemsToCheck listId={this.props.listId} items={this.props.node.itemsToCheck} revisionLabels={this.props.revisionLabels} node={this.props.node}></ItemsToCheck>
            </div>
        );
    },
    nodeChanged (property, newValue) {
        listActions.updateNode({
            listId: this.props.listId,
            node: this.props.node,
            property,
            newValue
        });
    }
});

export default ListNode;
