import React from 'react';
import AuthMenu from '../AuthMenu';
import SearchBar from '../SearchBar';
import ToggleButton from '../ToggleButton';
import Logo from '../Logo';
import { ReactComponent as ReactLogo } from '../../assets/logoText.svg';

function NavBar() {
  return (
    <nav className="fixed bg-gray-100 dark:bg-black-900 h-20 w-full flex items-center px-4 justify-between z-50 dark:border-black-100 border-b">
      <Logo />
      <SearchBar />
      <ToggleButton />
      <AuthMenu />
    </nav>
  );
}

export default NavBar;
