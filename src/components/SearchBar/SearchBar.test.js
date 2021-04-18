import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar.component';
import GlobalProvider from '../../state/GlobalProvider';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('SearchBar', () => {
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

  it('submits a search when key enter is pressed', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <GlobalProvider>
          <SearchBar />
        </GlobalProvider>
      </BrowserRouter>
    );
    fireEvent.keyDown(getByRole('searchbox'), {
      key: 'Enter',
      charCode: 13,
    });
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
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
