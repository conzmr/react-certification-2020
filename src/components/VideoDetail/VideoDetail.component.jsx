import React from 'react';
import moment from 'moment';
import uuid from 'react-uuid';
import VideosList from '../VideosList';
import LoadingOverlay from '../LoadingOverlay';
import ToggleButton from '../ToggleButton';
import useFavorite from '../../hooks/useFavorite';
import { useGlobalContext } from '../../state/GlobalProvider';

export default function VideoDetail({
  id,
  detail,
  relatedVideos,
  loadingRelatedVideos,
  loadingDetail,
}) {
  const [isFavorite, toggleFavorite] = useFavorite(id);
  const { state } = useGlobalContext();

  if (loadingDetail || loadingRelatedVideos) return <LoadingOverlay />;

  const { title, tags, statistics, publishedAt } = detail;
  const { dislikeCount, likeCount, viewCount } = statistics;

  const detailTags =
    tags &&
    tags.map((tag) => {
      return (
        <span
          key={uuid()}
          className="inline-block bg-gray-100 dark:bg-black-100 rounded-full px-3 py-1 text-xs font-normal text-gray-700 dark:text-black-50 mr-2 mb-2"
        >
          #{tag}
        </span>
      );
    });

  const formatNumber = (numberS) => {
    return Number(numberS).toLocaleString();
  };

  const isFavoriteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="red"
      className="h-4 w-4 text-gray-500 dark:text-white"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );

  const favoriteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-gray-500 dark:text-white"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );

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
        <div className="pt-5 pb-2">
          <h3 className="font-medium text-lg mb-2 text-black dark:text-white">{title}</h3>
          <div className="flex flex-row flex-wrap justify-between">
            <p className="text-xs text-gray-500 dark:text-white">
              {formatNumber(viewCount)} views •{' '}
              {moment(publishedAt).format('MMM D, YYYY')}
            </p>
            <div className="flex flex-row">
              <div className="w-max inline-flex items-center text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-gray-500 dark:text-white"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span className="text-xs ml-1 antialiased text-gray-500 dark:text-white">
                  {formatNumber(likeCount)}
                </span>
              </div>
              <div className="w-max inline-flex ml-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-gray-500 dark:text-white"
                >
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                <span className="text-xs ml-1 antialiased text-gray-500 dark:text-white">
                  {formatNumber(dislikeCount)}
                </span>
              </div>
              {state.authenticated ? (
                <div className="w-max inline-flex ml-4 items-center">
                  <ToggleButton
                    className="h-4 w-4 flex 'text-gray-500 dark:text-white"
                    selected={isFavorite}
                    icon={favoriteIcon}
                    selectedIcon={isFavoriteIcon}
                    onClick={toggleFavorite}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="pt-4 pb-2">{detailTags}</div>
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
