import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../utils/fetchApi";
import { styles } from "../theme";

var { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mx-4 mb-5">
        <Text className="text-white text-xl">Trending</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.push("AllMovie", { movies: data, title: "Trending" })
          }
        >
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <Carousel
        data={data.slice(0, 10)}
        renderItem={({ item }) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
