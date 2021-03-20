import React, { useRef } from 'react';
import './Home.styles.css';
import VideosList from '../../components/VideosList';
// import videos from '../../components/__mocks__/youtube-videos-mock';

const videos = [];

function HomePage() {
  const sectionRef = useRef(null);

  return (
    <section className="homepage" ref={sectionRef}>
      <VideosList videos={videos} />
    </section>
  );
}

export default HomePage;
