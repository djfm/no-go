import React, {Component} from 'react';

require('../styles/new-item-to-check.styl');

import listActions from '../actions/list-actions';

export default class NewItemToCheck extends Component {
    constructor (props) {
        super(props);
        this.state = {
            active: false,
            code: '',
            text: ''
        };
    }
    render () {
        if (this.state.active) {
            return (
                <div className="new-item-to-check">
                    <button onClick={this._done.bind(this, true)}>Save</button>&nbsp;
                    <button onClick={this._done.bind(this, false)}>Cancel</button>&nbsp;
                    <input type="text" className="item-code" placeholder="Optional code" value={this.state.code} onChange={this._codeChanged.bind(this)}></input>&nbsp;
                    <input type="text" className="item-text" placeholder="Test..." value={this.state.text} onChange={this._textChanged.bind(this)}></input>
                </div>
            );
        } else {
            return (
                <div className="new-item-to-check">
                    <button onClick={this._activate.bind(this)}>Add an item</button>
                </div>
            );
        }
    }
    _activate () {
        this.setState({active: true});
    }
    _codeChanged (evt) {
        this.setState({code: evt.target.value});
    }
    _textChanged (evt) {
        this.setState({text: evt.target.value});
    }
    _done (save) {
        if (save) {
            listActions.addItemToCheck({
                listId: this.props.listId,
                node: this.props.node,
                item: {
                    text: this.state.text,
                    code: this.state.code
                }
            });
        }

        this.setState({
            active: false,
            code: '',
            text: ''
        });
    }
}
