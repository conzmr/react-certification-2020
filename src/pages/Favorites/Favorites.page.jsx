import React from 'react';
import VideosList from '../../components/VideosList';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import { useGlobalContext } from '../../state/GlobalProvider';

function FavoritesPage() {
  const { state } = useGlobalContext();
  const favorites = Object.keys(state.favorites);
  const params = favorites.length > 0 && {
    favorites: Object.keys(state.favorites),
    part: 'snippet',
    type: 'video',
  };
  const method = favorites.length > 0 ? 'videos' : 'omit';
  const [isLoading, videos] = useYoutubeV3(method, params, true);

  return (
    <section className="flex w-full justify-around flex-wrap">
      <VideosList videos={videos} isLoading={isLoading} overlayLoader />
    </section>
  );
}

export default FavoritesPage;
