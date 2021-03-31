import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Layout from './Layout.component';
import NavBar from '../NavBar';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

useAuth.mockImplementation(() => {
  return { authenticated: false, logout: jest.fn() };
});

configure({ adapter: new Adapter() });

describe('Layout', () => {
  it('renders loading view when theme has not been loaded', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(container).toHaveTextContent('Sign in');
  });
  // it('renders navigation bar when theme is loaded', async() => {
  //   const wrapper = shallow(<Layout/>);
  //   console.log(wrapper.debug())
  //   await new Promise((r) => setTimeout(r, 3000));
  //   expect(wrapper.containsMatchingElement(<NavBar/>)).toEqual(true);
  // });
});
