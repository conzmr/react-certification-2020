import React, { useRef } from 'react';
import './Home.styles.css';
import VideosList from '../../components/VideosList';
import videos from '../../components/__mocks__/youtube-videos-mock';

function HomePage() {
  const sectionRef = useRef(null);
  return (
    <section className="homepage" ref={sectionRef}>
      <VideosList videos={videos.items} />
    </section>
  );
}

export default HomePage;
