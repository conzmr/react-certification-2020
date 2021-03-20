import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Layout from './Layout.component';
import ToggleButton from '../ToogleButton';
import AuthMenu from '../AuthMenu';
import SearchBar from '../SearchBar';

configure({ adapter: new Adapter() });

describe('Layout', () => {
  it('renders navigation bar with its elements', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.containsMatchingElement(<ToggleButton />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<AuthMenu />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<SearchBar />)).toEqual(true);
  });
});
