import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import VideoCard from './VideoCard.component';

const videoMock = {
  img: 'https://i.ytimg.com/vi/nmXMgqjQzls/hqdefault.jpg',
  title: 'Video Tour | Welcome to Wizeline Guadalajara',
  publishedAt: '2019-09-30T23:54:32Z',
  channel: 'Wizeline',
};

describe('VideoCard', () => {
  it('renders provided properties', () => {
    const { container } = render(<VideoCard {...videoMock} />);
    expect(screen.getByText(videoMock.title)).toBeTruthy();
    expect(container).toHaveTextContent(moment(videoMock.publishedAt).fromNow());
    expect(container).toHaveTextContent(videoMock.channel);
  });

  it('renders card information at the bottom by default', () => {
    const { container } = render(<VideoCard {...videoMock} />);
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('renders card information on the right when horizontal prop is provided', () => {
    const { container } = render(<VideoCard {...videoMock} direction="horizontal" />);
    expect(container.firstChild).toHaveClass('flex-row');
  });
});
