import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home.page';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import VideosList from '../../components/VideosList';
import { useGlobalContext } from '../../state/GlobalProvider';

configure({ adapter: new Adapter() });

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

useGlobalContext.mockImplementation(() => {
  return { state: {}, dispatch: jest.fn() };
});

jest.mock('../../hooks/useYoutubeV3', () => jest.fn());

useYoutubeV3.mockImplementation(() => [[], false, false]);

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useYoutubeV3.mockImplementation(() => [[], false, false]);
  });

  it('renders a VideoList component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<VideosList />)).toEqual(true);
  });

  it('requests the most popular videos to youtube api when there is no search term in global context ', async () => {
    render(<Home />);
    await waitFor(() =>
      expect(useYoutubeV3).toHaveBeenCalledWith(
        'videos',
        { chart: 'mostPopular', maxResults: 28, part: 'snippet', type: 'video' },
        true
      )
    );
  });

  it('requests for matching videos with key word when search term has some value', async () => {
    useGlobalContext.mockImplementation(() => {
      return { state: { searchTerm: 'test' }, dispatch: jest.fn() };
    });
    render(<Home />);

    await waitFor(() =>
      expect(useYoutubeV3).toHaveBeenCalledWith(
        'search',
        { maxResults: 28, part: 'snippet', q: 'test', type: 'video' },
        true
      )
    );
  });
});
