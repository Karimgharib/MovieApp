import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../utils/fetchApi";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";

var { width, height } = Dimensions.get("window");

const AllSeries = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { title, series } = route.params;

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="justify-between items-center flex-row mx-4 mt-4 mb-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl">{title} Series</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <View className="flex-row justify-between flex-wrap">
          {series?.map((serie) => (
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllSeries;
