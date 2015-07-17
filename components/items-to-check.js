import React, {Component} from 'react';

import ItemToCheck from './item-to-check';

export default class ItemsToCheck extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        if (this.props.items) {
            return (
                <div>
                    {this.props.items.map(item => {return <ItemToCheck item={item}></ItemToCheck>;})}
                </div>
            );
        } else {
            return <span>Nothing to check yet.</span>;
        }
    }
}
