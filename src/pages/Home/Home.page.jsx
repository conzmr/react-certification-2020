import React from 'react';
import VideosList from '../../components/VideosList';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import { useGlobalContext } from '../../state/GlobalProvider';

function HomePage() {
  const { state } = useGlobalContext();
  const url = state.searchTerm
    ? `search?q=${encodeURIComponent(
        state.searchTerm
      )}&part=snippet&type=video&maxResults=28`
    : 'videos?chart=mostPopular&part=snippet&type=video&maxResults=28';
  const [isLoading, videos] = useYoutubeV3(url, true);

  return (
    <section className="flex w-full justify-around items-center flex-wrap">
      <VideosList videos={videos} isLoading={isLoading} />
    </section>
  );
}

export default HomePage;
