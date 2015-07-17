import React, {Component} from 'react';

import Revision from './revision';
import listStore from '../stores/list-store';

export default class Revisions extends Component {

    constructor (props) {
        super(props);
        this.state = {
            listId: props.listId,
            revisionLabels: listStore.getRevisionLabels(props.listId)
        };
    }

    render () {
        return (
            <div>
                {this.props.revisions.map((revision, index) => {
                    return <Revision listId={this.props.listId} key={index} revision={revision}></Revision>;
                })}
            </div>
        );
    }
}
