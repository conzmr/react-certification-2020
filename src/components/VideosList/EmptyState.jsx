import React from 'react';
import YouTubeIcon from '@material-ui/icons/YouTube';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Icon = styled(YouTubeIcon)`
  font-size: 250px;
`;

function EmptyState() {
  return <MessageContainer>
    <Icon/>
    <h3>No videos to show</h3>
  </MessageContainer>;
}

export default EmptyState;
