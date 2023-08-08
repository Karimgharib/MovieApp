import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image185, fallbackMoviePoster } from "../utils/fetchApi";

var { width, height } = Dimensions.get("window");

const SerieList = ({ title, series, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl ">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() =>
              navigation.push("AllSerie", { title: title, series: series })
            }
          >
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {series?.slice(0, 10).map((serie) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.push("Serie", serie)}
            key={serie.id}
          >
            <View className="space-y-1 mr-4">
              <Image
                className="rounded-3xl "
                source={{
                  uri: image185(serie?.poster_path) || fallbackMoviePoster,
                }}
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="text-neutral-300 ml-1">
                {serie?.name?.length > 14
                  ? `${serie?.name?.slice(0, 14)}...`
                  : serie?.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default SerieList;
