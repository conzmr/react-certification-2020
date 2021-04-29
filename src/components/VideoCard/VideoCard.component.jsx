import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../state/GlobalProvider';
import useFavorite from '../../hooks/useFavorite';

const Title = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  display: none;
  color: white;
  padding: 5px;
  right: 0;
`;

const StyledCard = styled.div`
  position: relative;
  &:hover ${Actions} {
    display: flex;
  }
`;

function VideoCard({ id, title, channel, publishedAt, img, direction }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { state } = useGlobalContext();
  const [isFavorite, toggleFavorite] = useFavorite(id);

  const goToDetail = () => {
    history.push(pathname === '/favorites' ? `/favorites/${id}` : `/video/${id}`);
  };

  const isHorizontal = direction === 'horizontal';

  const favoriteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );

  const actions = state.authenticated ? (
    <Actions>
      <button
        type="button"
        onClick={toggleFavorite}
        className={`h-9 w-9 flex justify-center items-center focus:outline-none ${
          isFavorite ? 'text-red-500' : 'text-white'
        } bg-black-default bg-opacity-75 `}
      >
        {favoriteIcon}
      </button>
    </Actions>
  ) : null;

  return (
    <StyledCard
      className={`flex ${
        isHorizontal ? 'flex-row h-34 mb-2' : 'flex-col w-80 mb-4'
      } cursor-pointer`}
      role="button"
      onClick={goToDetail}
      onKeyDown={goToDetail}
      tabIndex={0}
    >
      <div className={isHorizontal ? 'bg-black mr-2' : ''} style={{ minWidth: '168px' }}>
        <img width={isHorizontal ? '168' : '360'} src={img} alt="video-thumbnail" />
      </div>
      <div className="flex flex-col flex-grow p-1">
        <Title
          className={`text-sm font-medium text-black dark:text-white ${
            isHorizontal ? '' : 'my-1.5'
          }`}
        >
          {title}
        </Title>
        <p className="text-xs text-gray-500 dark:text-white">{channel}</p>
        <p className="text-xs text-gray-500 dark:text-white">
          {moment(publishedAt).fromNow()}
        </p>
      </div>
      {actions}
    </StyledCard>
  );
}

export default VideoCard;
