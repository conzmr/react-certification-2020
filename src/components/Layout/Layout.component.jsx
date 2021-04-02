import React from 'react';
import './Layout.styles.css';
import NavBar from '../NavBar';
import { useDarkMode } from '../../hooks/useDarkMode';

function Layout({ children }) {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeClass = theme === 'dark' ? 'dark' : '';

  if (!componentMounted) return 'Loading...';

  const { body } = document;
  body.className = `${themeClass} bg-white dark:bg-black`;

  return (
    <div className={`flex ${themeClass} margin-0`}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex w-screen mt-20 p-4 justify-center">{children}</main>
    </div>
  );
}

export default Layout;
