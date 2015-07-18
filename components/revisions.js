import React, {Component} from 'react';
import _ from 'underscore';

import Revision from './revision';

require('../styles/revisions.styl');

export default class Revisions extends Component {

    getRevisionsByLabel () {
        var revisions = {};
        _.each(this.props.revisions, revision => {
            revisions[revision.label] = revision;
        });
        return revisions;
    }

    render () {
        var revisions = this.getRevisionsByLabel();
        return (
            <div className="revisions-container">
                <div className="revisions">
                    {_.map(this.props.revisionLabels, label => {
                        return (
                            <Revision key={label} listId={this.props.listId} label={label} revision={revisions[label]}></Revision>
                        );
                    }, this)}
                </div>
            </div>
        );
    }
}
