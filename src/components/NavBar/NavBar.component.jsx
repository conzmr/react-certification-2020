import React from 'react';
import AuthMenu from '../AuthMenu';
import SearchBar from '../SearchBar';
import ToggleButton from '../ToggleButton';

function NavBar() {
  return (
    <nav className="fixed bg-gray-100 dark:bg-black-900 h-20 w-full flex items-center px-4 justify-between z-50 dark:border-black-100 border-b">
      <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
      <SearchBar />
      <ToggleButton />
      <AuthMenu />
    </nav>
  );
}

export default NavBar;
