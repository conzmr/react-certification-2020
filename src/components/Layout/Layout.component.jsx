import React from 'react';
import './Layout.styles.css';
import NavBar from '../NavBar';
import { useGlobalContext } from '../../state/GlobalProvider';

function Layout({ children }) {
  const {state} = useGlobalContext();
  const themeClass = state.theme === 'dark' ? 'dark' : '';
  const { body } = document;
  body.className = `${themeClass} bg-white dark:bg-black`;
  return (
    <div className={`flex ${themeClass} margin-0`}>
      <NavBar/>
      <main className="flex w-screen mt-20 p-4 justify-center">
        {children}
      </main>
    </div>
  );
}

export default Layout;
