import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Favorites from './Favorites.page';
import useYoutubeV3 from '../../hooks/useYoutubeV3';
import VideosList from '../../components/VideosList';
import { useGlobalContext } from '../../state/GlobalProvider';

configure({ adapter: new Adapter() });

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

useGlobalContext.mockImplementation(() => {
  return { state: { favorites: {} }, dispatch: jest.fn() };
});

jest.mock('../../hooks/useYoutubeV3', () => jest.fn());

useYoutubeV3.mockImplementation(() => [[], false, false]);

describe('Favorites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useYoutubeV3.mockImplementation(() => [[], false, false]);
  });

  it('renders a VideoList component', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper.containsMatchingElement(<VideosList />)).toEqual(true);
  });

  it('does not calls youtube api if there is no favorite videos', async () => {
    render(<Favorites />);
    await waitFor(() => expect(useYoutubeV3).toHaveBeenCalledWith('omit', false, true));
  });

  it('requests for matching videos with key word when search term has some value', async () => {
    useGlobalContext.mockImplementation(() => {
      return { state: { favorites: { 1: 1, 2: 2 } }, dispatch: jest.fn() };
    });
    render(<Favorites />);
    await waitFor(() =>
      expect(useYoutubeV3).toHaveBeenCalledWith(
        'videos',
        { favorites: ['1', '2'], part: 'snippet', type: 'video' },
        true
      )
    );
  });
});
