import axios from "axios";

import { tmdbApiKey, translateApiKey } from "./constants/apiKey";

const baseUrl = "https://api.themoviedb.org/3/";

const tmdbApi = async (endPoint) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}${endPoint}?api_key=${tmdbApiKey}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default tmdbApi;

export const tmdbApiSearch = async (endPoint, query) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}${endPoint}?api_key=${tmdbApiKey}`,
      {
        params: {
          query: query,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const image500 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

//translate

export const translateText = async (text) => {
  const options = {
    method: "POST",
    url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": translateApiKey,
      "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
    },
    data: {
      from: "en",
      to: "ar",
      q: text,
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};
