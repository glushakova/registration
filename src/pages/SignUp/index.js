import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Loader, TextInput } from '../../components';
import './style.css';

function SignUp() {
  const [email, onChangeFromProps] = useState('');
  const [pincode, onPincodeChange] = useState('');
  const [loading, loadingChange] = useState(false);
  const [userUid, uidChange] = useState(null);
  const [error, errorChange] = useState('');

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pincode)
      .then((response) => {
        if (response.user.uid) {
          loadingChange(false);
          uidChange(response.user.uid);
        }
      })
      .catch((error) => {
        loadingChange(false);
        errorChange(error.message);
      });
    loadingChange(true);
    errorChange('');
  };

  const clickButton = (event) => {
    if (event.type && email.length > 6 && pincode.length >= 6 && !loading) {
      signUp();
    }
  };

  const renderLoader = () => {
    if (loading) {
      return <Loader />;
    }
  };

  const onClearClick = () => {
    onChangeFromProps('');
    onPincodeChange('');
    errorChange('');
    uidChange(null);
  };

  return (
    <div className="page">
      <div className="sign-up">
        <h3 className="text">Sign up</h3>
        <TextInput
          type="text"
          label="email"
          valueFromProps={email}
          onChangeFromProps={(event) => onChangeFromProps(event.target.value)}
        />
        <TextInput
          type="password"
          label="pincode"
          valueFromProps={pincode}
          onChangeFromProps={(event) => onPincodeChange(event.target.value)}
        />
        <button onClick={(event) => clickButton(event)}>
          {userUid && !error ? 'Success' : 'Sign up'}
        </button>
        <button onClick={onClearClick}>Clear</button>
        {error ? (
          <h3 className="h3">{error}</h3>
        ) : (
          <h3 className="h3">{userUid}</h3>
        )}
        {renderLoader()}
      </div>
    </div>
  );
}

export { SignUp };
