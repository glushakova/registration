import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { SignIn, SignUp, Main } from '../pages';

const Navigation = () => {
  const [user, setUserData] = useState(null);

  return (
    <BrowserRouter>
      <NavBar user={user} setUserData={setUserData} />
      <Switch>
        <Route path="/sign-in">
          <SignIn setUserData={setUserData} />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <Main user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
