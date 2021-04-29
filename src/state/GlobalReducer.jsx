import { storage } from '../utils/storage';
import { themes } from '../utils/constants';

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_THEME': {
      const theme = themes[action.payload];
      localStorage.setItem('theme', JSON.stringify(theme));
      return {
        ...state,
        theme,
      };
    }
    case 'SET_USER_AUTHENTICATED': {
      const sessionData = action.payload;
      storage.set('sessionData', sessionData);
      return {
        ...state,
        authenticated: true,
        sessionData
      };
    }
    case 'SET_USER_DEAUTHENTICATED': {
      const sessionData = {};
      storage.set('sessionData', sessionData);
      return {
        ...state,
        authenticated: false,
        sessionData
      };
    }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'OPEN_LOGIN_MODAL':
      return {
        ...state,
        showLoginModal: true,
      };
    case 'CLOSE_LOGIN_MODAL':
      return {
        ...state,
        showLoginModal: false,
      };
    case 'ADD_FAVORITE': {
      const { favorites } = state;
      favorites[action.payload] = action.payload;
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return {
        ...state,
        favorites,
      };
    }
    case 'DELETE_FAVORITE': {
      const { favorites } = state;
      delete favorites[action.payload];
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return {
        ...state,
        favorites,
      };
    }
    default:
      return state;
  }
};

export default GlobalReducer;
