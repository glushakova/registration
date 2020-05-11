import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function TextInput(props) {
  const { type, label, valueFromProps, onChangeFromProps } = props;

  const [style, addStyle] = useState('');

  const show_hide_password = () => {
    var input = document.getElementsByClassName('input')[1];
    if (input.getAttribute('type') == 'password') {
      input.setAttribute('type', 'text');
      addStyle('view');
    } else {
      input.setAttribute('type', 'password');
      addStyle('');
    }
  };

  return (
    <div className="text-input">
      <span className="label">{label}</span>
      <div className="password">
        <input
          className="input"
          type={type}
          onChange={onChangeFromProps}
          value={valueFromProps}
        />
        {type === 'password' && (
          <button
            className={`password-control ${style}`}
            onClick={() => show_hide_password()}
          ></button>
        )}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  valueFromProps: PropTypes.string,
  onChangeFromProps: PropTypes.func,
};

export { TextInput };
