import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme/index";
import TrendingSeries from "../components/TrendingSeries";
import SerieList from "./../components/SerieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import tmdbApi from "../utils/fetchApi";

const ios = Platform.OS == "ios";

const trs = `trending/tv/day`;
const ps = `tv/popular`;
const ts = `tv/top_rated`;

const HomeScreenSeries = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchTrending = async () => {
    const data = await tmdbApi(trs);
    setTrending(data.results);
  };

  const fetchPopular = async () => {
    const data = await tmdbApi(ps);
    setPopular(data.results);
  };

  const fetchTopRated = async () => {
    const data = await tmdbApi(ts);
    setTopRated(data.results);
  };

  useEffect(() => {
    fetchTrending();
    fetchPopular();
    fetchTopRated();
    setLoading(false);
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <View className="flex-row justify-between items-center m-4">
          <Text className="text-white text-3xl font-bold ">
            <Text style={styles.text}>S</Text>eries
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <TrendingSeries data={trending} />
          <SerieList title="Popular" series={popular} />
          <SerieList title="Top Rated" series={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreenSeries;
