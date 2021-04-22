import React from 'react';
import VideosList from '../../components/VideosList';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import { useGlobalContext } from '../../state/GlobalProvider';

function FavoritesPage() {
  const { state } = useGlobalContext();
  const favorites = Object.keys(state.favorites);
  const favoriteQuery = favorites.reduce((p, fav) => `${p}id=${fav}&`, '');
  const url = favoriteQuery.length
    ? `videos?${favoriteQuery}part=snippet&type=video`
    : favoriteQuery;

  const [isLoading, videos] = useYoutubeV3(url, true);

  if (state.favorites.length < 1) return 'No favorites videos';

  return (
    <section className="flex w-full justify-around items-center flex-wrap">
      <VideosList videos={videos} isLoading={isLoading} />
    </section>
  );
}

export default FavoritesPage;
