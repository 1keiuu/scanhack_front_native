import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import User from "../User";

export default class SignIn extends Component {
  onPressButton() {
    User.login();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>sign In</Text>
        <Button
          onPress={this.onPressButton}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
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
