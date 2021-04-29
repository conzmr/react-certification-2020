import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import VideoDetail from '../../pages/VideoDetail';
import Favorites from '../../pages/Favorites';
import App from './App.component';
// import { useGlobalContext } from '../../state/GlobalProvider';

configure({ adapter: new Adapter() });

describe('App', () => {
  const createRouter = (initialEntry = '/') => {
    return (
      <MemoryRouter initialEntries={[initialEntry]} initialIndex={0}>
        <App />
      </MemoryRouter>
    );
  };
  it('invalid path should redirect to Not Found page', () => {
    const wrapper = mount(createRouter('/Random'));
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('/ should render Home page', () => {
    const wrapper = mount(createRouter('/'));
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it('/results should redirect to home page', () => {
    const wrapper = mount(createRouter('/results'));
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it('/video/1234 should render Video Detail page', () => {
    const wrapper = mount(createRouter('/video/1234'));
    expect(wrapper.find(VideoDetail)).toHaveLength(1);
  });

  it('/favorites should redirect to Home page when user is not authenticated', () => {
    const wrapper = mount(createRouter('/favorites'));
    expect(wrapper.find(Favorites)).toHaveLength(0);
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it('/favorites/idsad should redirect to Home page when user is not authenticated', () => {
    const wrapper = mount(createRouter('/favorites'));
    expect(wrapper.find(VideoDetail)).toHaveLength(0);
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  // describe('Private routes', () => {
  //     // beforeAll(() => {
  //     //     jest.mock('../../state/GlobalProvider', () => ({
  //     //         useGlobalContext: jest.fn(),
  //     //     }));
  //     //     useGlobalContext.mockImplementation(() => {
  //     //         return { state: { authenticated: false, sessionData: {} }, dispatch: jest.fn() };
  //     //     });
  //     // })

  //     it('/favorites should redirect to Home page when user is not authenticated', () => {
  //         jest.mock('../../state/GlobalProvider', () => ({
  //             useGlobalContext: jest.fn(),
  //         }));
  //         useGlobalContext.mockImplementation(() => {
  //             return { state: { authenticated: false, sessionData: {} }, dispatch: jest.fn() };
  //         });
  //         const wrapper = mount(createRouter('/favorites'));
  //         console.log(wrapper.debug())
  //         expect(wrapper.find(Favorites)).toHaveLength(0);
  //         expect(wrapper.find(Home)).toHaveLength(1);
  //     });

  //     it('/favorites/idsad should redirect to Home page when user is not authenticated', () => {
  //         const wrapper = mount(createRouter('/favorites'));
  //         console.log(wrapper.debug())
  //         expect(wrapper.find(VideoDetail)).toHaveLength(0);
  //         expect(wrapper.find(Home)).toHaveLength(1);
  //     });

  // })
});
