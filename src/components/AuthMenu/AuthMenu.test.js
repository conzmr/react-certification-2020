import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthMenu from './AuthMenu.component';
import { useGlobalContext } from '../../state/GlobalProvider';

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

describe('AuthMenu', () => {
  beforeEach(() => {
    useGlobalContext.mockImplementationOnce(() => {
      return { state: { authenticated: false }, dispatch: jest.fn() };
    });
    useGlobalContext.mockImplementationOnce(() => {
      return { state: { authenticated: true }, dispatch: jest.fn() };
    });
  });

  it('renders login button if user is not authenticated', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthMenu />
      </BrowserRouter>
    );
    expect(container).toHaveTextContent('Sign in');
  });

  it('renders list menu if user is authenticated', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthMenu />
      </BrowserRouter>
    );
    expect(container).toHaveTextContent('Log out');
  });
});
