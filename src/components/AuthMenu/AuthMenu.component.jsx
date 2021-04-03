import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';

function AuthMenu() {
  const history = useHistory();
  const { authenticated, logout } = useAuth();

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

  const linkClassName =
    'text-sm p-1 ml-0.5 text-gray-500 hover:text-gray-900 dark:text-black-50';

  return authenticated ? (
    <button type="button" className={linkClassName} onClick={deAuthenticate}>
      Log out
    </button>
  ) : (
    <Link to="/login" className={linkClassName}>
      Sign in
    </Link>
  );
}

export default AuthMenu;
