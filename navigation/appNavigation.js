import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenMovies from "../screens/HomeScreenMovies";
import HomeScreenSeries from "../screens/HomeScreenSeries";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";
import SerieScreen from "../screens/SerieScreen";
import { theme } from "../theme";

import { FilmIcon, TvIcon } from "react-native-heroicons/outline";
import AllMovies from "../screens/AllMovies";
import AllSeries from "../screens/AllSeries";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "rgb(38,38,38)",
        tabBarInactiveBackgroundColor: "rgb(38,38,38)",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <FilmIcon name="movies" color={color} size={size} />
          ),
        }}
        name="Movies"
        component={HomeScreenMovies}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <TvIcon name="series" color={color} size={size} />
          ),
        }}
        name="Series"
        component={HomeScreenSeries}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Serie" component={SerieScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="AllMovie" component={AllMovies} />
        <Stack.Screen name="AllSerie" component={AllSeries} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
