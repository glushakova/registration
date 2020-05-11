import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Navigation';

import firebaseConfig from './config/firebaseConfig';
import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root')
);
