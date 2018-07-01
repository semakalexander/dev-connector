import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Developers from './Developers';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Landing from './Landing';

const MainContent = () => {
  return (
    <Switch>
      <Route path="/developers" component={Developers} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />

      <Route path="/" component={Landing} exact />

      <Redirect to="/" />
    </Switch>
  );
};

export default MainContent;
