import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch, Router, Route } from "react-router-dom";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import CameraScreen from "./screens/CameraScreen";
import Auth from "./Auth";
import { createMemoryHistory } from "history";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
    Home: Home,
    SignIn: SignIn,
    Camera: CameraScreen,
  },
  {
    initialRouteName: "Home",
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
