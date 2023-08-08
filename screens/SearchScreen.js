import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  image185,
  tmdbApiSearch,
} from "../utils/fetchApi";
import { debounce } from "lodash";

var { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchSeries, setSearchSeries] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const searchMovie = `search/movie`;
  const searchSerie = `search/tv`;

  const fetchMovies = async () => {
    const data = await tmdbApiSearch(searchMovie, term);
    setSearchMovies(data.results);
  };

  const fetchSeries = async () => {
    const data = await tmdbApiSearch(searchSerie, term);
    setSearchSeries(data.results);
  };

  useEffect(() => {
    if (term.length > 2) {
      fetchMovies();
      fetchSeries();
    }
  }, [term]);

  const handleTextDebounce = useCallback(
    debounce((input) => setTerm(input), 400),
    []
  );

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          // value={term}
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : searchMovies?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({searchMovies?.length + searchSeries?.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {searchMovies.map((movie) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("Movie", movie)}
                  key={movie.id}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: image185(movie.poster_path) || fallbackMoviePoster,
                      }}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {movie.title.length > 22
                        ? movie.title.slice(0, 22) + "..."
                        : movie.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
            {searchSeries?.map((serie) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("Serie", serie)}
                  key={serie.id}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: image185(serie.poster_path) || fallbackMoviePoster,
                      }}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {serie.name.length > 22
                        ? serie.name.slice(0, 22) + "..."
                        : serie.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
