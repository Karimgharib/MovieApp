import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import tmdbApi, { fallbackPersonImage, image342 } from "../utils/fetchApi";
import SerieList from "../components/SerieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const PersonScreen = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [castDetails, setCastDetails] = useState({});
  const [castMovies, setCastMovies] = useState([]);
  const [castSeries, setCastSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params: item } = useRoute();

  const personDetails = `person/${item.id}`;
  const personMovies = `person/${item.id}/movie_credits`;
  const personSeries = `person/${item.id}/tv_credits`;

  const fetchPerson = async () => {
    const data = await tmdbApi(personDetails);
    setCastDetails(data);
  };

  const fetchMovies = async () => {
    const data = await tmdbApi(personMovies);
    setCastMovies(data.cast);
  };

  const fetchSeries = async () => {
    const data = await tmdbApi(personSeries);
    setCastSeries(data.cast);
  };

  useEffect(() => {
    fetchPerson();
    fetchMovies();
    fetchSeries();
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <SafeAreaView
        className={`w-full flex-row justify-between items-center px-4 ${topMargin}`}
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
          <View
            className="flex-row justify-center"
            // style={{
            //   shadowColor: "gray",
            //   shadowRadius: 40,
            //   shadowOffset: { width: 0, height: 5 },
            //   shadowOpacity: 0.5,
            //   elevation: 10,
            // }}
          >
            <View
              // style={{ shadowColor: "gray", elevation: 10 }}
              className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2"
            >
              <Image
                source={{
                  uri:
                    image342(castDetails.profile_path) || fallbackPersonImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {castDetails.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {castDetails.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {castDetails.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {castDetails.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">known for</Text>
              <Text className="text-neutral-300 text-sm">
                {castDetails.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {castDetails.popularity?.toFixed(1)}%
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {castDetails.biography ? castDetails.biography : "N/A"}
            </Text>
          </View>

          <MovieList title="Movies" hideSeeAll={true} movies={castMovies} />
          <SerieList title="Series" hideSeeAll={true} series={castSeries} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
