import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class TextInput extends Component {
  render() {
    return (
      <div className="text-input">
        <span className="label">{this.props.label}</span>
        <input
          className="input"
          type={this.props.type}
          onChange={this.props.onChangeFromProps}
          value={this.props.valueFromProps}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.func,
};
export default TextInput;
