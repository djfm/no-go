import React from 'react';

require('../styles/editable.styl');

export default React.createClass({
    propTypes: {
        onChange: React.PropTypes.func
    },
    getDefaultProps () {
        return {
            onChange: undefined
        };
    },
    getInitialState () {
        return {
            editing: false,
            text: this.props.initialText
        };
    },
    componentWillReceiveProps (nextProps) {
        this.setState({
            text: nextProps.initialText
        });
    },
    render () {
        if (this.state.editing) {
            return (
                <span className="editable">
                    <input type="text" value={this.state.text} onChange={this.textChanded}></input>&nbsp;
                    <button type="button" className="save-edits-button" onClick={() => {this.stopEditing(true);}}>Save</button>&nbsp;
                    <button type="button" className="cancel-edits-button" onClick={() => {this.stopEditing(false);}}>Cancel</button>
                </span>
            );
        } else {
            return (
                <span className="editable">
                    <span className="editable-text" onClick={this.startEditing}>{this.state.text}</span>&nbsp;
                </span>
            );
        }
    },
    textChanded (evt) {
        this.setState({text: evt.target.value});
    },
    startEditing () {
        this.setState({
            editing: true,
            originalText: this.state.text
        });
    },
    stopEditing (saveEdits) {
        if (!saveEdits) {
            this.setState({
                text: this.state.originalText
            });
        } else if (this.props.onChange && this.state.text !== this.state.originalText) {
            this.props.onChange(this.state.text);
        }

        this.setState({
            editing: false
        });
    }
});
