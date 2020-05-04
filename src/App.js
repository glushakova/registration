import React from 'react';
import './App.css';
import SignIn from './components/SingIn';
import SingUp from './components/SingUp';

function App() {
  return (
    <div className="App">
      <SignIn />
      <h3>Don’t have an account?</h3>
      <SingUp />
    </div>
  );
}

export default App;
