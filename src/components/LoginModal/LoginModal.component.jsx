import React, { useState } from 'react';
import { useGlobalContext } from '../../state/GlobalProvider';
import Modal from '../Modal';
import Logo from '../Logo';
import loginApi from './login.api';
import Spinner from '../Spinner';

function LoginModal() {
  const { state, dispatch } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function close() {
    dispatch({ type: 'CLOSE_LOGIN_MODAL' });
  }

  async function authenticate(event) {
    event.preventDefault();
    setSigningIn(true);
    try {
      const loginData = await loginApi(email, password);
      dispatch({ type: 'SET_USER_AUTHENTICATED', payload: loginData });
      close();
    } catch ({ message }) {
      setErrorMessage(message);
    }
    setSigningIn(false);
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
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label htmlFor="password" className="w-full">
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
              className={inputClass}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button
            type="submit"
            className="h-10 text-sm bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl w-full outline-none focus:outline-none justify-center items-center flex"
          >
            {signingIn ? <Spinner size={4} className="m-0" /> : 'LOG IN'}
          </button>

          <div className="mt-4 h-5">
            <div className="relative flex justify-center text-sm">
              <span data-testid="status" className="px-2 text-red-600 font-semibold">
                {errorMessage}
              </span>
            </div>
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default LoginModal;
