import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const lightTheme = 'light';
  const darkTheme = 'dark';
  const [theme, setTheme] = useState(lightTheme);
  const [componentMounted, setComponentMounted] = useState(false);
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    setMode(theme === lightTheme ? darkTheme : lightTheme);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    const preferedTheme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? darkTheme
        : lightTheme;
    if (localTheme) setMode(localTheme);
    else setMode(preferedTheme);
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
