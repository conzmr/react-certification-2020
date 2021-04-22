import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from './NavBar.component';
import AuthMenu from '../AuthMenu';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import ToggleButton from '../ToggleButton';
import { useGlobalContext } from '../../state/GlobalProvider';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/testPath',
  }),
}));

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('Nav bar', () => {
  it('renders containing all its elements: search bar, toggle button and auth menu', () => {
    useGlobalContext.mockImplementation(() => {
      return { state: { theme: 'ligth' }, dispatch: mockDispatch };
    });
    const wrapper = shallow(<NavBar />);
    expect(wrapper.containsMatchingElement(<Logo />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<ToggleButton />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<AuthMenu />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<SearchBar />)).toEqual(true);
  });

  describe('Toogle theme', () => {
    it('renders moon icon when theme is ligth', () => {
      useGlobalContext.mockImplementation(() => {
        return { state: { theme: 'ligth' }, dispatch: mockDispatch };
      });
      render(<NavBar />);
      expect(screen.getByTestId('moon-icon')).toBeTruthy();
    });

    it('renders sun icon when theme is dark', () => {
      useGlobalContext.mockImplementationOnce(() => {
        return { state: { theme: 'dark' }, dispatch: mockDispatch };
      });
      render(<NavBar />);
      expect(screen.getByTestId('sun-icon')).toBeTruthy();
    });

    it('shows dark theme button when the toggle theme button is clicked', async () => {
      useGlobalContext.mockImplementation(() => {
        return { state: { theme: 'ligth' }, dispatch: mockDispatch };
      });
      render(<NavBar />);
      const button = screen.getByTestId('toogle-button');
      fireEvent.click(button);
      await waitFor(() =>
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_THEME', payload: 'dark' })
      );
    });
  });
});
