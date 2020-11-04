import React from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Switch, Router, Route, Link } from "react-router-dom";
import CameraPage from "./CameraPage";
import { createMemoryHistory } from "history";
export default class Home extends React.Component {
  async componentDidMount() {}
  render() {
    const history = createMemoryHistory();

    return (
      <View style={{ flex: 1 }}>
        <Link to="/cameraPage">
          <Text>Camera</Text>
        </Link>
        <Router history={history}>
          <Route exact path="/cameraPage">
            <CameraPage />
          </Route>
        </Router>
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
