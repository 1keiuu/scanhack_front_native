import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import User from "../User";
import axios from "../plugins/axios.js";
import ENV from "../environments";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  async onPressButton() {
    // User.login();
    await axios
      .post("/api/v1/users/signup", { name: this.state.name })
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        <TextInput
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
        <Button
          onPress={this.onPressButton}
          title="Sign In"
          color="#841584"
          accessibilityLabel="Sign In about button"
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
