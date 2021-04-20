import { storage } from '../utils/storage';
import { themes } from '../utils/constants';

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_USER_AUTHENTICATED': {
      const isAuth = action.payload;
      storage.set('authenticated', isAuth);
      return {
        ...state,
        authenticated: isAuth
      };
    }
    case "LOAD_FROM_STORAGE": {
      const getPreferedTheme = () => {
        const preferedTheme =
          window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? themes.dark
            : themes.light;
        return preferedTheme;
      };
      const favorites = storage.get('favorites') || [];
      const authenticated = storage.get('authenticated') || false;
      const theme = storage.get('theme') || getPreferedTheme();
      return {
        ...state,
        favorites,
        authenticated,
        theme
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
    default:
      return state;
  }
};

export default GlobalReducer;
