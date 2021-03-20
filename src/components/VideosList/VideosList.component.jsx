import React from 'react';
import VideoCard from '../VideoCard';
import EmptyState from './EmptyState';

function VideosList({ videos }) {
  return (
    <>
      {videos.length ? (
        videos.items.map((video) => {
          const { id, snippet } = video;
          const { thumbnails, channelTitle, title, publishedAt } = snippet;
          const img = thumbnails && thumbnails.high && thumbnails.high.url;
          if (id && id.videoId)
            return (
              <VideoCard
                img={img}
                title={title}
                channel={channelTitle}
                publishedAt={publishedAt}
              />
            );
          return null;
        })
      ) : (
        <EmptyState />
      )}
    </>
  );
}

export default VideosList;
