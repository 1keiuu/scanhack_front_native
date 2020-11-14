import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import ItemList from "./screens/ItemList";
import ItemListScreen from "./screens/ItemListScreen";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import ResultScreen from "./screens/ResultScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

const RootStack = createStackNavigator(
  {
    SignUp: SignUp,
    SignIn: SignIn,
    ItemList: ItemList,
    Laff: createBottomTabNavigator(
      {
        Home: {
          screen: createStackNavigator(
            {
              Index: HomeScreen,
              Camera: CameraScreen,
              Result: ResultScreen,
            },
            {
              initialRouteName: "Index",
            }
          ),
        },
        ItemList: {
          screen: ItemListScreen,
        },
      },
      {
        initialRouteName: "Home",
        navigationOptions: {
          headerShown: false,
          // headerLeft: null,
          // headerStyle: { backgroundColor: "#fff", height: 80 },
        },
      }
    ),
  },
  {
    initialRouteName: "SignUp",
    navigationOptions: {
      headerShown: false,
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
