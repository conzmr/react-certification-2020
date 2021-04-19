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
