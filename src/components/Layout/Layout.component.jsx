import React from 'react';
import './Layout.styles.css';
import NavBar from '../NavBar';
import { useDarkMode } from '../../hooks/useDarkMode';

function Layout({ children }) {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeClass = theme === 'dark' ? 'dark' : '';

  if (!componentMounted) return 'Loading...';

  return (
    <div className={`flex ${themeClass}`}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex w-screen mt-20 p-4 justify-center">{children}</main>
    </div>
  );
}

export default Layout;
