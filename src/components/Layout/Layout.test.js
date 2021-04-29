import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Layout from './Layout.component';
import NavBar from '../NavBar';
import { useGlobalContext } from '../../state/GlobalProvider';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

configure({ adapter: new Adapter() });

useGlobalContext.mockImplementation(() => {
  return { state: {}, dispatch: jest.fn() };
});

describe('Layout', () => {
  it('renders NavBar and its children', () => {
    const children = <div>Hello</div>;
    const wrapper = shallow(<Layout>{children}</Layout>);
    expect(wrapper.containsMatchingElement(<NavBar />)).toEqual(true);
  });

  describe('Theme', () => {
    let wrapper;
    beforeEach(() => {
      useGlobalContext.mockImplementationOnce(() => {
        return { state: { theme: 'ligth' }, dispatch: jest.fn() };
      });
      useGlobalContext.mockImplementationOnce(() => {
        return { state: { theme: 'dark' }, dispatch: jest.fn() };
      });
      wrapper = shallow(<Layout />);
    });

    it('does not has dark className when provider theme is ligth', () => {
      expect(wrapper.find('div').first().hasClass('dark')).toEqual(false);
    });

    it('has dark className when provider theme is dark', () => {
      expect(wrapper.find('div').first().hasClass('dark')).toEqual(true);
    });
  });
});
