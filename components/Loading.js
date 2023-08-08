import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { styles, theme } from "../theme";

const { width, height } = Dimensions.get("window");

const Loading = () => {
  return (
    <View
      style={{ height, width }}
      className="absolute z-20 flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={10}
        size={100}
        color={theme.background}
      />
    </View>
  );
};
export default Loading;
