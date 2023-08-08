import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fallbackPersonImage, image185 } from "../utils/fetchApi";

const MovieCast = ({ cast }) => {
  const navigation = useNavigation();
  return (
    <View className="my-6">
      <Text className="text-white mx-4 text-lg mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Person", person)}
                className="mr-4 items-center"
                key={person.id}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>

                <Text className="text-white text-xs mt-1">
                  {person?.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text className="text-neutral-400 text-xs">
                  {person?.original_name.length > 10
                    ? person.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MovieCast;
