import React, {Component} from 'react';

export default class RevisionComment extends Component {
    render () {
        return <div>{this.props.comment.text}&nbsp;<span className="author">({this.props.comment.author})</span></div>;
    }
}
