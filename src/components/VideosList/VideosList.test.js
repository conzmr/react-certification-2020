import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import VideosList from './VideosList.component';
import EmptyState from './EmptyState';
import VideoCard from '../VideoCard';
import videos from '../__mocks__/youtube-videos-mock.json';

configure({ adapter: new Adapter() });

describe('VideosList', () => {
  it('renders empty state when there are no videos to display', () => {
    const wrapper = shallow(<VideosList />);
    expect(wrapper.containsMatchingElement(<EmptyState />)).toEqual(true);
  });

  it('renders video cards when a list of videos is passed as props', () => {
    const wrapper = shallow(<VideosList videos={videos.items} />);
    expect(wrapper.containsMatchingElement(<VideoCard />)).toEqual(true);
  });

  it('renders only video cards with video information', () => {
    const wrapper = shallow(<VideosList videos={videos.items} />);
    expect(wrapper.find(VideoCard).length).toEqual(videos.items.length);
  });
});
