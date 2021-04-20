import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from '../../state/GlobalProvider';

function Private({ children, ...rest }) {
  const { state } = useGlobalContext();

  return (
    <Route {...rest} render={() => (state.authenticated ? children : <Redirect to="/" />)} />
  );
}

export default Private;
