import React from 'react';
import './style.css';

function Main({ user }) {
  return (
    <div className="main">{user ? `Hello, ${user.displayName}` : `Hello`}</div>
  );
}

export { Main };
