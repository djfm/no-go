import React, {Component} from 'react';

import Revisions from './revisions';

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
                    <span>({this.props.item.author})</span>
                </div>
                <div className="revisions">
                    <Revisions revisions={this.props.item.revisions}></Revisions>
                </div>
            </div>
        );
    }
}
