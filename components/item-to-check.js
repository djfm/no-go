import React, {Component} from 'react';

import Revisions from './revisions';

require('../styles/item-to-check.styl');

export default class ItemToCheck extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="item-to-check">
                <div className="header">
                    <span>{this.props.item.code}</span>&nbsp;-&nbsp;
                    <span>{this.props.item.text}</span>&nbsp;
                    <span className="author">({this.props.item.author})</span>
                </div>
                <div className="revisions">
                    <Revisions listId={this.props.listId} revisions={this.props.item.revisions} revisionLabels={this.props.revisionLabels}></Revisions>
                </div>
            </div>
        );
    }
}
