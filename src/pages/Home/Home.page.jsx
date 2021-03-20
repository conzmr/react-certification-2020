import React, { useRef } from 'react';
import './Home.styles.css';
import VideoCard from '../../components/VideoCard';
import videos from './youtube-videos-mock.json';

function HomePage() {
  const sectionRef = useRef(null);

  return (
    <section className="homepage" ref={sectionRef}>
      {videos.items.map((video, index) => {
        const {id, snippet} = video;
        const {thumbnails, channelTitle, title, publishedAt} = snippet;
        const img = thumbnails && thumbnails.high && thumbnails.high.url;
        if (id && id.videoId) return (
          <VideoCard
            img={img}
            title={title}
            channel={channelTitle}
            publishedAt={publishedAt}
        />)
        return null;
      })}
    </section>
  );
}

export default HomePage;