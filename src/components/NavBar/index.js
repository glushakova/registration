import React from 'react';
import * as firebase from 'firebase';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

const NavBar = ({ user, setUserData }) => {
  const history = useHistory();
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserData(null);
      });
    toSignIn();
  };
  const toSignIn = () => {
    history.push('/sign-in');
  };

  return (
    <nav className="navbar">
      <Link to="/">Main</Link>
      {user?.uid ? (
        <>
          <span>{`Hello, ${user.displayName}`}</span>
          <button className="button" onClick={signOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
