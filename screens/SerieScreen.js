import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

import SerieCast from "../components/SerieCast";
import Loading from "../components/Loading";
import tmdbApi, {
  fallbackMoviePoster,
  image500,
  translateText,
} from "../utils/fetchApi";
import SerieList from "../components/SerieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const SerieScreen = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [serie, setSerie] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translate, setTranslate] = useState("");

  const { params: item } = useRoute();
  const navigation = useNavigation();

  const serieDetails = `tv/${item.id}`;
  const serieCast = `tv/${item.id}/credits`;
  const serieSimilar = `tv/${item.id}/similar`;

  const fetchDetails = async () => {
    const data = await tmdbApi(serieDetails);
    setSerie(data);
  };

  const fetchCast = async () => {
    const data = await tmdbApi(serieCast);
    setCast(data.cast);
  };

  const fetchSimilar = async () => {
    const data = await tmdbApi(serieSimilar);
    setSimilarSeries(data.results);
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

      <View>
        <View>
          <Image
            source={{
              uri: image500(serie.poster_path) || fallbackMoviePoster,
            }}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23, 1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>

        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {serie.name}
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {serie?.status} • {serie?.first_air_date?.split("-")[0] || "N/A"} •{" "}
            {serie?.number_of_seasons} Season
          </Text>
          <View className="flex-row justify-center mx-4 space-x-2">
            {serie?.genres?.slice(0, 3).map((genre, index) => {
              let showDot = index + 1 != serie.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                >
                  {genre?.name} {showDot ? "•" : null}
                </Text>
              );
            })}
          </View>
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {serie.overview}
          </Text>
          <TouchableOpacity onPress={() => handleTranslate(serie.overview)}>
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
        <SerieCast cast={cast} />
        <SerieList
          title="Similar Series"
          hideSeeAll={true}
          series={similarSeries}
        />
      </View>
    </ScrollView>
  );
};

export default SerieScreen;
