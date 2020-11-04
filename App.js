import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch, Router, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Auth from "./Auth";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Router history={history}>
        <Route exact path="/signIn">
          <SignIn />
        </Route>

        {/* <Auth> */}
        <Route exact path="/">
          <Home />
        </Route>
        {/* </Auth> */}
      </Router>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
