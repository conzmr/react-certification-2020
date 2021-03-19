import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import styled from "styled-components";
import { 
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  IconButton
 } from '@material-ui/core';
import moment from "moment";

const CardImg = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
`;

const Title = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  margin: 5px 0;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  display: none;
  color: white;
  padding: 5px;
  right: 0;
`;

const StyledCard = styled(Card)`
   width: 320px;
   margin: 0 15px 20px;
   position: relative;
  &:hover ${Actions} {
    display: flex;
  }
`;

const ActionButton = styled(IconButton)`
  background-color: #30303052;
  color: white;
`;

const StyledCardHeader = styled(CardHeader)`
  padding: 6px;
`;

function VideoCard({title, channel, publishedAt, img}) {

  return (
    <StyledCard>
      <CardImg image={img}/>
      <CardContent>
       <Title>{title}</Title>
      <StyledCardHeader
        avatar={
          <Avatar aria-label="channel">
            {channel.charAt(0)}
          </Avatar>
        }
        title={channel}
        subheader={moment(publishedAt).fromNow()}
      />
      </CardContent>
      <Actions disableSpacing>
        <ActionButton aria-label="Add to favorites">
          <FavoriteIcon />
        </ActionButton>
        <ActionButton aria-label="Share">
          <ShareIcon />
        </ActionButton>
      </Actions>
    </StyledCard>
  );
}

export default VideoCard;