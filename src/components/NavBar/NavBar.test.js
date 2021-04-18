import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import NavBar from './NavBar.component';
import AuthMenu from '../AuthMenu';
import SearchBar from '../SearchBar';
import ToggleButton from '../ToggleButton';

configure({ adapter: new Adapter() });

describe('Nav bar', () => {
  it('renders containing all its elements: search bar, toggle button and auth menu', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.containsMatchingElement(<ToggleButton />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<AuthMenu />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<SearchBar />)).toEqual(true);
  });
});
