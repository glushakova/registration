import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Loader, TextInput } from '../../components';
import { Redirect, Link } from 'react-router-dom';
import './style.css';

function SignIn({ setUserData }) {
  const [email, onChangeFromProps] = useState('');
  const [pincode, onPincodeChange] = useState('');
  const [loading, loadingChange] = useState(false);
  const [userUid, uidChange] = useState(null);
  const [error, errorChange] = useState('');

  const clickButton = () => {
    if (email.length > 6 && pincode.length >= 6 && !loading && !userUid) {
      signIn();
    }
  };

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pincode)
      .then((response) => {
        if (response.user.uid) {
          loadingChange(false);
          uidChange(response.user.uid);
        }
        setUserData(response.user);
      })
      .catch((error) => {
        loadingChange(false);
        errorChange(error.message);
        onPincodeChange('');
        onChangeFromProps('');
      });
    loadingChange(true);
    errorChange('');
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
      <div className="sign-in">
        <h3 className="text">Sign in</h3>
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
          {userUid && !error ? 'Success' : 'Sign in'}
        </button>
        <button onClick={onClearClick}>Clear</button>
        {error ? (
          <h3 className="h3">{error}</h3>
        ) : (
          <h3 className="h3">{userUid}</h3>
        )}
        {renderLoader()}
      </div>
      <Link to="/sign-up">Don’t have an account?</Link>
      {userUid && <Redirect to="/" />}
    </div>
  );
}

export { SignIn };
