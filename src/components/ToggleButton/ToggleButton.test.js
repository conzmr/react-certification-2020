import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButton from './ToggleButton.component';
import GlobalProvider from '../../state/GlobalProvider';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/testPath',
  }),
}));

describe('ToggleButton', () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <ToggleButton />
      </GlobalProvider>
    );
  });

  it('renders moon icon when theme is ligth', () => {
    expect(screen.getByTestId('moon-icon')).toBeTruthy();
  });

  it('shows dark theme button when the toggle theme button is clicked', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByTestId('sun-icon')).toBeTruthy();
  });
});
