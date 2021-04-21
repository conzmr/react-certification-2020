import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../state/GlobalProvider';

export default function SideNav() {
  const history = useHistory();
  const { state, dispatch } = useGlobalContext();

  const logout = (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_USER_AUTHENTICATED', payload: false });
    history.push('/');
  };
  
  const favoritesLink = !state.authenticated ? null : (
    <li className="hover:bg-gray-100 dark:hover:bg-black-100">
      <Link
        data-testid="favorites-link"
        to="/favorites"
        className="h-16 px-6 flex flex justify-center items-center w-full
      focus:text-orange-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </Link>
    </li>
  );

  const logoutButton = !state.authenticated ? null : (
    <button
      onClick={logout}
      data-testid="logout-button"
      type="button"
      className="h-16 w-10 mx-auto flex flex justify-center items-center
    w-full focus:text-orange-500 hover:bg-gray-100 dark:hover:bg-black-100 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );

  return (
    <aside className="flex flex-col items-center bg-gray-50 dark:bg-black-900 text-gray-500 dark:text-white shadow h-full fixed pt-20">
      <ul>
        <li className="hover:bg-gray-100 dark:hover:bg-black-100">
          <Link
            data-testid="home-link"
            to="/"
            className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        {favoritesLink}
      </ul>

      <div className="mt-auto h-16 flex items-center w-full">{logoutButton}</div>
    </aside>
  );
}
