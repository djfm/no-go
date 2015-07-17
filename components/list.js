import React from 'react';

import ListNode from './list-node';
import listStore from '../stores/list-store';
import listActions from '../actions/list-actions';

export default React.createClass({
    getInitialState() {
        return {
            loading: true,
            listId: this.props.params.listId
        };
    },
    componentDidMount () {
        listStore.addChangeListener(this.state.listId, this._onChange);
        listActions.loadList(this.state.listId);
    },
    componentWillUnmount () {
        listStore.removeChangeListener(this.state.listId, this._onChange);
    },
    render () {
        if (!this.state.list) {
            return <span>Loading, please wait...</span>;
        } else {
            return <ListNode listId={this.state.listId} depth={0} node={this.state.list}></ListNode>;
        }
    },
    _onChange () {
        this.setState(listStore.getState(this.state.listId));
    }
});
