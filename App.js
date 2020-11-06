import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import CameraScreen from "./screens/CameraScreen";
import ResultScreen from "./screens/ResultScreen";
import ItemList from "./screens/ItemList";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
    Home: Home,
    SignUp: SignUp,
    ItemList: ItemList,
    Camera: CameraScreen,
    Result: ResultScreen,
  },
  {
    initialRouteName: "SignUp",
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
