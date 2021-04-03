import React from 'react';
import VideoCard from '../VideoCard';
import EmptyState from './EmptyState';
import LoadingOverlay from '../LoadingOverlay';

function VideosList({ isLoading, videos, cardDirection }) {
  if (isLoading) return <LoadingOverlay />;
  return (
    <>
      {videos && videos.length ? (
        videos.map((video) => {
          const { id, thumbnails, channelTitle, title, publishedAt } = video;
          const img = thumbnails && thumbnails.medium && thumbnails.medium.url;
          return (
            <VideoCard
              direction={cardDirection}
              id={id}
              key={id}
              img={img}
              title={title}
              channel={channelTitle}
              publishedAt={publishedAt}
            />
          );
        })
      ) : (
        <EmptyState />
      )}
    </>
  );
}

export default VideosList;
