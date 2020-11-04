import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import axios from "../plugins/axios.js";
import storage from "../plugins/storage";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  async componentDidMount() {
    storage
      .load({ key: "credentials" })
      .then((res) => {
        console.log(res);
        if (res.token && res.name && res.token !== "" && res.name !== "") {
          this.props.navigation.navigate("Home");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  async onPressButton() {
    console.log("this.state.name");
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
        alert(e.response.data.message[0]);
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
          style={styles.nameInput}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aliceblue",
  },
  Title: {},
  nameInput: {
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 10,
    marginBottom: 10,
    width: "70%",
  },
});
