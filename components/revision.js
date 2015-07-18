import React, {Component} from 'react';

import RevisionComments from './revision-comments';

require('../styles/revision.styl');

export default class Revision extends Component {
    render () {
        return (
            <div className="revision">
                <div className="label"><span>{this.props.label}</span></div>
                <RevisionComments comments={this.props.revision ? this.props.revision.comments : []}></RevisionComments>
            </div>
        );
    }
}
