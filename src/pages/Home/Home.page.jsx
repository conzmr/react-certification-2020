import React from 'react';
import './Home.styles.css';
import VideosList from '../../components/VideosList';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import { useGlobalContext } from '../../state/GlobalProvider';

function HomePage() {
  const { state } = useGlobalContext();
  const url = state.searchTerm
    ? `search?q=${encodeURIComponent(
        state.searchTerm
      )}&part=snippet&type=video&maxResults=25`
    : 'videos?chart=mostPopular&part=snippet&type=video&maxResults=25';
  const [isLoading, videos] = useYoutubeV3(url, true);

  return (
    <section className="homepage">
      <VideosList videos={videos} isLoading={isLoading} />
    </section>
  );
}

export default HomePage;
