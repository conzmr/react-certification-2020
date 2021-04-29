import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../state/GlobalProvider';
import LoginModal from '../LoginModal';

function AuthMenu() {
  const history = useHistory();
  const { state, dispatch } = useGlobalContext();

  function deAuthenticate(event) {
    event.preventDefault();
    dispatch({ type: 'SET_USER_DEAUTHENTICATED' });
    history.push('/');
  }

  const showSignInModal = (event) => {
    event.preventDefault();
    dispatch({ type: 'OPEN_LOGIN_MODAL' });
  };

  const buttonConfig = state.authenticated
    ? {
        title: 'Log out',
        onClick: deAuthenticate,
      }
    : {
        title: 'Sign in',
        onClick: showSignInModal,
      };
  return (
    <>
      <button
        type="button"
        className="text-base p-1 ml-0.5 text-gray-500 hover:text-gray-900 dark:text-white outline-none focus:outline-none"
        onClick={buttonConfig.onClick}
      >
        {buttonConfig.title}
      </button>
      <LoginModal />
    </>
  );
}

export default AuthMenu;
