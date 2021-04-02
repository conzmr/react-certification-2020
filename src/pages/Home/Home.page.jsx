import React, { useRef } from 'react';
import './Home.styles.css';
import VideosList from '../../components/VideosList';
import { useLocation } from "react-router-dom";
import useYoutubeV3 from "../../hooks/useYoutubeV3";
const queryString = require('query-string');

function HomePage() {
  const sectionRef = useRef(null);
  const { search } = useLocation();
  let query = queryString.parse(search).q;
  let url = query ? `search?q=${encodeURIComponent(query)}` : 'videos?chart=mostPopular';
  const [isLoading, , videos] = useYoutubeV3(url, true);
  return (
    <section className="homepage" ref={sectionRef}>
      <VideosList videos={videos} isLoading={isLoading}/>
    </section>
  );
}

export default HomePage;



