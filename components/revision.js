import React, {Component} from 'react';

export default class Revision extends Component {
    render () {
        return (
            <div>
                <div>{this.props.revision.label}</div>
            </div>
        )
    }
}
