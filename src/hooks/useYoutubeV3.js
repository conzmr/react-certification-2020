import { useState, useEffect, useCallback } from 'react';

const useYoutubeV3 = (url, isList) => {
  const [loadedVideo, setLoadedVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideosList] = useState([]);
  const baseURL = 'https://youtube.googleapis.com/youtube/v3/';
  const key = 'AIzaSyAd6QgvL3SGC8fRlh7y38uLp-WrLEQMwRw';
  const fullUrl = `${baseURL}${url}&part=snippet&type=video&maxResults=25&key=${key}`;

  const parseDetail = (data) => {
    console.log('data', data);
    // const loadedVideo = {
    //   image: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
    //   name: data.name,
    //   height: data.height,
    //   weight: data.weight,
    //   type: data.types[0].type.name,
    //   movesCount: data.moves.length,
    // }
    return loadedVideo;
  };

  const parseList = (data) => {
    const list = data.items.map((video, index) => ({
      ...video.snippet,
      id: video.id && video.id.videoId,
    }));
    return list;
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      if (!isList) {
        const video = parseDetail(data);
        setLoadedVideo(video);
      } else {
        const list = parseList(data);
        setVideosList(list);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [url, isList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [isLoading, loadedVideo, videos];
};

export default useYoutubeV3;
