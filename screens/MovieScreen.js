import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

import MovieCast from "../components/MovieCast";
import MovieList from "./../components/MovieList";
import Loading from "../components/Loading";
import tmdbApi, {
  fallbackMoviePoster,
  image500,
  translateText,
} from "../utils/fetchApi";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState("");

  const { params: item } = useRoute();
  const navigation = useNavigation();

  const movieDetails = `movie/${item.id}`;
  const movieCast = `movie/${item.id}/credits`;
  const movieSimilar = `movie/${item.id}/similar`;

  const fetchDetails = async () => {
    const data = await tmdbApi(movieDetails);
    setMovie(data);
  };

  const fetchCast = async () => {
    const data = await tmdbApi(movieCast);
    setCast(data.cast);
  };

  const fetchSimilar = async () => {
    const data = await tmdbApi(movieSimilar);
    setSimilarMovies(data.results);
  };

  const handleTranslate = async (text) => {
    const data = await translateText(text);
    setTranslate(data[0]);
  };

  useEffect(() => {
    fetchDetails();
    fetchCast();
    fetchSimilar();
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <SafeAreaView
        className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon
            size="35"
            color={isFavourite ? theme.background : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View>
            <Image
              source={{
                uri: image500(movie.poster_path) || fallbackMoviePoster,
              }}
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23,23,23,0.8)",
                "rgba(23,23,23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold tracking-widest">
              {movie.title}
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
              {movie?.runtime} min
            </Text>
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text
                    key={genre.id}
                    className="text-neutral-400 font-semibold text-base text-center"
                  >
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                );
              })}
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movie.overview}
            </Text>
            <TouchableOpacity onPress={() => handleTranslate(movie.overview)}>
              <Text style={styles.text} className="mx-4">
                Translate to Arabic
              </Text>
            </TouchableOpacity>

            {translate?.length > 0 && (
              <Text className="text-neutral-400 mx-4 tracking-wide">
                {translate}
              </Text>
            )}
          </View>
          <MovieCast cast={cast} />
          <MovieList
            title="Similar Movies"
            hideSeeAll={true}
            movies={similarMovies}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
