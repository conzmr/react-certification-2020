import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import reducer from './GlobalReducer';
import { themes } from '../utils/constants';

const initialState = {
  theme: themes.light,
  searchTerm: '',
  error: null,
  sessionData: null,
  showLoginModal: false,
  authenticated: false
};

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
  const [state, dispatch] = useReducer(reducer, { ...initialState, searchTerm });

  useEffect(() => {
   // if (searchTerm) dispatch({type: 'SET_SEARCH_TERM', payload: searchTerm});
    dispatch({ type: "LOAD_FROM_STORAGE" });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { useGlobalContext };

export default GlobalProvider;
