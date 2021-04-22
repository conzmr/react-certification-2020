import { useState, useEffect } from 'react';
import { useGlobalContext } from '../state/GlobalProvider';

export default function useFavorite(id) {
  const { state, dispatch } = useGlobalContext();
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(state.favorites[id]);
  }, [state.favorites, id]);

  const addFavorite = () => {
    dispatch({ type: 'ADD_FAVORITE', payload: id });
    setFavorite(true);
  };

  const removeFavorite = () => {
    dispatch({ type: 'DELETE_FAVORITE', payload: id });
    setFavorite(false);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    return isFavorite ? removeFavorite() : addFavorite();
  };

  return [isFavorite, toggleFavorite];
}
