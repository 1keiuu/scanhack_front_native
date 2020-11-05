import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import CameraScreen from "./screens/CameraScreen";
import ItemList from "./screens/ItemList";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      // headerTitle: "ホーム",
      // defaultNavigationOptions: {
      //   headerTitle: "ホーム",
      //   headerMode: "none",
      // },
    },
    SignUp: {
      screen: SignUp,
      // defaultNavigationOptions: ({ navigation }) => ({
      //   title: "SignUpsss",
      //   headerMode: "none",
      // }),
    },
    ItemList: {
      screen: ItemList,
      naviagtionOptions: {
        // title: "ホーム",
        headerMode: "none",
      },
    },
    Camera: {
      screen: CameraScreen,
      naviagtionOptions: {
        // title: "ホーム",
        headerMode: "none",
      },
    },
  },
  {
    initialRouteName: "SignUp",
    // defaultNavigationOptions: {
    //   headerMode: "none",
    // },
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
