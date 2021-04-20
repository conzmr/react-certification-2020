import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../state/GlobalProvider';
import Modal from '../../components/Modal';
import Logo from '../../components/Logo';

function LoginPage() {
  const { state, dispatch } = useGlobalContext();
  const history = useHistory();

  function close() {
    dispatch({ type: 'CLOSE_LOGIN_MODAL' });
  }

  function authenticate(event) {
    close();
    event.preventDefault();
    dispatch({ type: 'SET_USER_AUTHENTICATED', payload: true });
    history.push('/secret');
  }

  const inputClass =
    'w-full rounded-3xl mb-6 border-1 border-gray-300 bg-white dark:bg-mediumGray dark:text-white dark:border-black-100 h-10 px-5 pr-10 text-sm focus:outline-none outline-none';

  return (
    <Modal isOpen={state.showLoginModal} onDismiss={close}>
      <section className="w-72 flex flex-col py-5">
        <Logo className="m-auto mb-4" />
        <form onSubmit={authenticate} className="login-form">
          <label htmlFor="username" className="w-full">
            <input
              required
              type="text"
              id="username"
              placeholder="Username"
              className={inputClass}
            />
          </label>
          <label htmlFor="password" className="w-full">
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl w-full"
          >
            LOG IN
          </button>
        </form>
      </section>
    </Modal>
  );
}

export default LoginPage;
