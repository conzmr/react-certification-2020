import React, { createContext, useContext, useReducer } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import reducer from "./GlobalReducer";
import {themes} from '../utils/constants';

const getDefaultTheme = () => {
  const localTheme = window.localStorage.getItem('theme');
  const preferedTheme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? themes.dark
        : themes.light;
    if (localTheme) return localTheme;
    else return preferedTheme;
}

const initialState = {
  theme: getDefaultTheme(),
  searchTerm: '',
  error: null
}

const GlobalContext = createContext();

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(`Can't use "useGlobalContext" without a GlobalProvider!`);
  }
  return context;
}

function GlobalProvider({ children }) {
  const { search } = useLocation();
  const searchTerm = queryString.parse(search).q;
  const [state, dispatch] = useReducer(reducer, {...initialState, searchTerm});

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { useGlobalContext };

export default GlobalProvider;