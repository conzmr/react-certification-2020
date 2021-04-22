import { renderHook } from '@testing-library/react-hooks';
import useYoutubeV3 from './useYoutubeV3';
import videos from '../components/__mocks__/youtube-videos-mock.json';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(videos),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  global.fetch.mockClear();
});

describe('useYoutubeV3', () => {
  it('returns expected initial state', () => {
    const { result } = renderHook(() => useYoutubeV3());
    const [isLoading, response, error] = result.current;
    expect(isLoading).toBe(false);
    expect(response).toBeInstanceOf(Object);
    expect(error).toBeNull();
  });

  it('returns list of videos', async () => {
    const { result, waitForNextUpdate } = renderHook(
      ({ url }) => useYoutubeV3(url, true),
      {
        initialProps: {
          url: 'url1',
        },
      }
    );
    await waitForNextUpdate();
    const [isLoading, response] = result.current;
    expect(isLoading).toBe(false);
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(1);
    expect(response[0]).toHaveProperty('publishedAt');
  });

  it('returns a single video', async () => {
    const { result, waitForNextUpdate } = renderHook(({ url }) => useYoutubeV3(url), {
      initialProps: {
        url: 'url1',
      },
    });
    await waitForNextUpdate();
    const [isLoading, response] = result.current;
    expect(isLoading).toBe(false);
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('publishedAt');
  });
});
