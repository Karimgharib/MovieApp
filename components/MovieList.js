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

const MovieList = ({ title, movies, hideSeeAll }) => {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl ">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() =>
              navigation.push("AllMovie", { title: title, movies: movies })
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
        {movies?.slice(0, 10).map((movie) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.push("Movie", movie)}
            key={movie.id}
          >
            <View className="space-y-1 mr-4">
              <Image
                className="rounded-3xl "
                source={{
                  uri: image185(movie.poster_path) || fallbackMoviePoster,
                }}
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="text-neutral-300 ml-1">
                {movie?.title?.length > 14
                  ? `${movie.title.slice(0, 14)}...`
                  : movie.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
