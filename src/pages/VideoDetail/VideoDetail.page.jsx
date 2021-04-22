import React from 'react';
import { useParams } from 'react-router-dom';
import VideoDetail from '../../components/VideoDetail';
import useYoutubeV3 from '../../hooks/useYoutubeV3';

function VideoDetailPage() {
  const { id } = useParams();
  const videoDetailUrl = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
  const relatedVideoslUrl = `search?part=snippet&type=video&relatedToVideoId=${id}&format=5&restriction=DE&maxResults=10`;

  const [loadingDetail, detail, videoError] = useYoutubeV3(videoDetailUrl);
  const [loadingRelatedVideos, relatedVideos, relatedVidError] = useYoutubeV3(
    relatedVideoslUrl,
    true
  );

  if (videoError) return 'NOT FOUND ';

  return (
    <VideoDetail
      id={id}
      detail={detail}
      loadingDetail={loadingDetail}
      relatedVideos={relatedVideos}
      loadingRelatedVideos={loadingRelatedVideos}
    />
  );
}

export default VideoDetailPage;
