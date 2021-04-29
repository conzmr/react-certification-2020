import React from 'react';
import './Layout.styles.css';
import NavBar from '../NavBar';
import SideNav from '../SideNav';
import { useGlobalContext } from '../../state/GlobalProvider';

function Layout({ children }) {
  const { state } = useGlobalContext();
  const themeClass = state.theme === 'dark' ? 'dark' : '';
  const { body } = document;
  body.className = `${themeClass} bg-white dark:bg-black`;
  return (
    <div className={`flex ${themeClass} margin-0`}>
      <NavBar />
      <SideNav />
      <main className="flex w-screen mt-20">
        <div className="flex w-full justify-center p-4 ml-20">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
