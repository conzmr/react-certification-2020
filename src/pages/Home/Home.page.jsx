import React from 'react';
import VideosList from '../../components/VideosList';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import { useGlobalContext } from '../../state/GlobalProvider';

function HomePage() {
  const { state } = useGlobalContext();
  const method = state.searchTerm ? 'search' : 'videos';
  const params = {
    ...(state.searchTerm ? { q: state.searchTerm } : { chart: 'mostPopular' }),
    part: 'snippet',
    type: 'video',
    maxResults: 28,
  };
  const [isLoading, videos] = useYoutubeV3(method, params, true);

  return (
    <section className="flex w-full justify-around items-center flex-wrap">
      <VideosList videos={videos} isLoading={isLoading} />
    </section>
  );
}

export default HomePage;
