import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import axios from "../plugins/axios.js";
import storage from "../plugins/storage";

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        token: "",
      },
      currentInput: "",
      items: [],
    };
  }
  async componentDidMount() {
    storage
      .load({ key: "credentials" })
      .then((res) => {
        console.log(res);
        this.setState({ user: { id: res.id, token: res.token } });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  async onPressAddButton() {
    const input = this.state.currentInput;
    // axios.defaults.headers.Authorization = `Bearer: ${this.state.user.token}`;
    axios
      .post(
        "/api/v1/users/" + this.state.user.id + "/items",
        { name: input },
        {
          headers: { Authorization: "`Bearer:${this.state.user.token}`" },
        }
      )
      .then((res) => {
        console.log(res);
        const newArray = this.state.items;
        newArray.push(input);
        this.setState({ items: newArray });
        this.setState({ currentInput: "" });
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChange={(currentInput) => this.setState({ currentInput })}
          value={this.state.currentInput}
        />
        <Button title="追加" onPress={() => this.onPressAddButton()}>
          追加
        </Button>
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
