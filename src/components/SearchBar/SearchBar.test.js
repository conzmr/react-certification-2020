import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mount, configure, shallow } from 'enzyme';
import SearchBar from './SearchBar.component';
import GlobalProvider from '../../state/GlobalProvider';

configure({ adapter: new Adapter() });

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('SearchBar', () => {
  // it('renders correctly', () => {
  //   const { queryByPlaceholderText } = render(<GlobalProvider>
  //              <SearchBar/>
  //            </GlobalProvider>)
  //   const searchInput = queryByPlaceholderText('Search...')
  //   fireEvent.change(searchInput, { target: { value: 'test' } })
  //   expect(searchInput.value).toBe('test')
  // })
  it('updates on change', async () => {
    const { queryByPlaceholderText } = render(
      <BrowserRouter>
        <GlobalProvider>
          <SearchBar />
        </GlobalProvider>
      </BrowserRouter>
    );
    const searchInput = queryByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => expect(searchInput.value).toBe('test'));
  });

  it('redirects to home URL on search submit when there is no search term', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <GlobalProvider>
          <SearchBar />
        </GlobalProvider>
      </BrowserRouter>
    );
    fireEvent.click(getByRole('button'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('redirects to videos search URL on submit when there is a search term', async () => {
    const { getByRole, queryByPlaceholderText } = render(
      <BrowserRouter>
        <GlobalProvider>
          <SearchBar />
        </GlobalProvider>
      </BrowserRouter>
    );
    const searchInput = queryByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'videos query' } });
    fireEvent.click(getByRole('button'));
    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith('/results?q=videos+query')
    );
  });
});
