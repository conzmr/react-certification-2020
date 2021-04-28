import React from 'react';
import { useParams } from 'react-router-dom';
import VideoDetailInfo from '../../components/VideoDetailInfo';
import VideosList from '../../components/VideosList';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../state/GlobalProvider';

function VideoDetailPage() {
  const { id } = useParams();
  const {pathname} = useLocation();
  const { state } = useGlobalContext();
  const favorites = Object.keys(state.favorites).filter(i => i !== id);
  const filterByFavorites = pathname.split('/')[1] === 'favorites';

  const searchQueryParams = {
    part: ['snippet', 'contentDetails', 'statistics'],
    id,
  };
  const relatedQueryParams = {
    part: 'snippet',
    type: 'video',
    ...filterByFavorites ? {
      favorites 
    } : {
      relatedToVideoId: id,
      format: 5,
      restriction: 'DE',
      maxResults: 10
    }
  }
  const [loadingDetail, detail, videoError] = useYoutubeV3('videos', searchQueryParams);
  const getRelatedVidsMethod = () => {
    if (!filterByFavorites) return 'search';
    return favorites.length > 0 ? 'videos' : 'omit';
  }
  const [loadingRelatedVideos, relatedVideos, relatedVidError] = useYoutubeV3(
    getRelatedVidsMethod(),
    relatedQueryParams,
    true
  );

  if (videoError || relatedVidError) return 'SOMETHING WENT WRONG, TRY AGAIN LATER';

  return (
    <div className="flex flex-wrap w-full">
      <div className="sm:w-full mb-4 lg:w-2/3 lg:pr-2.5">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title={`video#${id}`}
            src={`https://www.youtube.com/embed/${id}?&autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <VideoDetailInfo isLoading={loadingDetail} id={id} {...detail} />
      </div>
      <div className="sm:w-full lg:w-1/3 mb-4">
        <VideosList
          videos={relatedVideos}
          isLoading={loadingRelatedVideos}
          cardDirection="horizontal"
        />
      </div>
    </div>
  );
}

export default VideoDetailPage;
