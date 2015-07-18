import React, {Component} from 'react';

import ItemToCheck from './item-to-check';
import NewItemToCheck from './new-item-to-check';

require('../styles/items-to-check.styl');

export default class ItemsToCheck extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        var listId = this.props.listId;


        if (this.props.items) {
            return (
                <div className="items-to-check-container">
                    {this.props.items.map((item, index) => {return <ItemToCheck listId={listId} key={index} item={item} revisionLabels={this.props.revisionLabels}></ItemToCheck>;})}
                    <NewItemToCheck node={this.props.node} listId={listId}/>
                </div>
            );
        } else {
            return <div className="items-to-check-container">Nothing to check yet.<NewItemToCheck/></div>;
        }
    }
}
