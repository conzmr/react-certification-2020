import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SideNav from './SideNav.component';
import { useGlobalContext } from '../../state/GlobalProvider';

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

useGlobalContext.mockImplementation(() => {
  return { state: { authenticated: false }, dispatch: jest.fn() };
});

describe('SideNav', () => {
  it('renders home link', () => {
    render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    expect(screen.getByTestId('home-link')).toHaveAttribute('href', '/');
  });

  it('does not render favorites or logout button if user is not authenticated', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    expect(queryByTestId('logout-button')).toBeNull();
  });

  it('renders favorites and logout button if user is authenticated', () => {
    useGlobalContext.mockImplementationOnce(() => {
      return { state: { authenticated: true }, dispatch: jest.fn() };
    });
    render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    expect(screen.getByTestId('favorites-link')).toHaveAttribute('href', '/favorites');
    expect(screen.getByTestId('logout-button')).toBeTruthy();
  });
});
