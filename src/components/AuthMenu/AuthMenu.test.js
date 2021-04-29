import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthMenu from './AuthMenu.component';
import { useGlobalContext } from '../../state/GlobalProvider';

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

useGlobalContext.mockImplementation(() => {
  return { state: { authenticated: false, sessionData: {} }, dispatch: jest.fn() };
});

describe('AuthMenu', () => {
  it('renders login button if user is not authenticated', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthMenu />
      </BrowserRouter>
    );
    expect(container).toHaveTextContent('Sign in');
  });

  it('renders list logout button if user is authenticated', () => {
    useGlobalContext.mockImplementationOnce(() => {
      return {
        state: { authenticated: true, sessionData: { name: 'Test' } },
        dispatch: jest.fn(),
      };
    });
    const { container } = render(
      <BrowserRouter>
        <AuthMenu />
      </BrowserRouter>
    );
    console.log(screen.debug());
    expect(container).toHaveTextContent('Log out');
  });
});
