import React, { Fragment } from 'react';
import VideoCard from '../VideoCard';
import EmptyState from './EmptyState';
import LoadingOverlay from '../LoadingOverlay';

function VideosList({ isLoading, videos }) {
  if (isLoading) return <LoadingOverlay />;
  return (
    <>
      {videos && videos.length ? (
        videos.map((video) => {
          const { id, thumbnails, channelTitle, title, publishedAt } = video;
          const img = thumbnails && thumbnails.high && thumbnails.high.url;
          return (
            <VideoCard
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
