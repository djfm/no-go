import React, {Component} from 'react';

import RevisionComment from './revision-comment';

export default class RevisionComments extends Component {
    render () {
        return <div>{this.props.comments.map((comment, index) => {
            return <RevisionComment key={index} comment={comment}></RevisionComment>;
        })}</div>;
    }
}
