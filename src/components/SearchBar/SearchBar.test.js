import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { mount, configure } from 'enzyme';
import SearchBar from './SearchBar.component';

configure({ adapter: new Adapter() });

describe('SearchBar', () => {
  it('should have the given value as value prop', () => {
    const value = 'Testing component';
    const wrapper = mount(<SearchBar value={value} />);
    expect(wrapper.props().value).toEqual(value);
  });
});
