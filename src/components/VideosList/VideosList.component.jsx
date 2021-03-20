import React, { Fragment } from 'react';
import uuid from 'react-uuid';
import VideoCard from '../VideoCard';
import EmptyState from './EmptyState';

function VideosList({ videos }) {
  return (
    <Fragment>
      {videos && videos.length ? (
        videos.map((video) => {
          const { id, snippet } = video;
          const { thumbnails, channelTitle, title, publishedAt } = snippet;
          const img = thumbnails && thumbnails.high && thumbnails.high.url;
          if (id && id.videoId)
            return (
              <VideoCard
                key={uuid()}
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
    </Fragment>
  );
}

export default VideosList;
