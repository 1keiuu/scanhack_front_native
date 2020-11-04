import React from "react";
import { Button, View, TouchableHighlight, StyleSheet } from "react-native";
import { Switch, Router, Route, Link } from "react-router-dom";
import CameraScreen from "./CameraScreen";
import { createMemoryHistory } from "history";
export default class Home extends React.Component {
  async componentDidMount() {}
  render() {
    const history = createMemoryHistory();

    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Go to Camera"
          onPress={() => this.props.navigation.navigate("Camera")}
        />
        <Button
          title="Go to SignIn"
          onPress={() => this.props.navigation.navigate("SignIn")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "aliceblue",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});
