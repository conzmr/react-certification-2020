import { useState, useEffect, useCallback } from 'react';

const useYoutubeV3 = (url, isList) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = 'https://youtube.googleapis.com/youtube/v3/';
  const key = 'AIzaSyBWSm1p0enwojA4l7iDFxy9llXbwz4rrXE';
  const fullUrl = `${baseURL}${url}&key=${key}`;

  const parseVideos = (data) => {
    const list = data.items.map((video) => ({
      ...video.snippet,
      id: typeof video.id === 'string' ? video.id : video.id.videoId,
    }));
    return list;
  };

  const parseVideo = (data) => {
    const video = data.items[0];
    if (!video) throw new Error('Video not found');
    return {
      ...video.snippet,
      statistics: video.statistics,
    };
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (url) {
        const res = await fetch(fullUrl);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        const parsedData = isList ? parseVideos(data) : parseVideo(data);
        setResponse(parsedData);
      }
      setIsLoading(false);
    } catch (e) {
      const errorMessage = e.message || 'An error occurred, try again later';
      setError(errorMessage);
      setResponse({});
      setIsLoading(false);
    }
  }, [url, fullUrl, isList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [isLoading, response, error];
};

export default useYoutubeV3;
