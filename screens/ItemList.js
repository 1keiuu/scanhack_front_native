import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import axios from "../plugins/axios.js";
import storage from "../plugins/storage";

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  async onPressButton() {
    console.log(this.state.name);
    await axios
      .post("/api/v1/users/signup", { name: this.state.name })
      .then((res) => {
        storage.save({
          key: "credentials",
          data: { token: res.data.data.token, name: res.data.data.name },
        });
        this.props.navigation.navigate("Home");
      })
      .catch((e) => {
        console.log(e.response.data.message[0]);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <TextInput
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
        <Button
          onPress={() => {
            this.onPressButton();
          }}
          title="Sign Up"
          color="#841584"
          accessibilityLabel="Sign Up button"
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
