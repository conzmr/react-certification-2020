import { useState, useEffect, useCallback } from 'react';

const useYoutubeV3 = (url, isList) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
    return {
      ...video.snippet,
      statistics: video.statistics,
    };
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(fullUrl);
      const data = await res.json();
      const parsedData = isList ? parseVideos(data) : parseVideo(data);
      setResponse(parsedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [fullUrl, isList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [isLoading, response];
};

export default useYoutubeV3;
