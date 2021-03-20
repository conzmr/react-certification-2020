import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthMenu from './AuthMenu.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

describe('AuthMenu', () => {
  it('renders login button if user is not authenticated', () => {
    useAuth.mockImplementation(() => {
      return { authenticated: false, logout: jest.fn() };
    });
    const { container } = render(
      <BrowserRouter>
        <AuthMenu />
      </BrowserRouter>
    );
    expect(container).toHaveTextContent('Log in');
  });

  it('renders list menu if user is authenticated', () => {
    useAuth.mockImplementation(() => {
      return { authenticated: true, logout: jest.fn() };
    });
    render(
      <BrowserRouter>
        <AuthMenu />
      </BrowserRouter>
    );
    expect(screen.getByText('Profile')).toBeTruthy();
  });
});
