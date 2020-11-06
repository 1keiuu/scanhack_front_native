import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "../plugins/axios.js";
import storage from "../plugins/storage";
import { Button, Input, Item, Form } from "native-base";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  static navigationOptions = {
    headerShown: false,
  };

  async onPressButton() {
    await axios
      .post("/api/v1/users/login", { name: this.state.name })
      .then((res) => {
        storage.save({
          key: "credentials",
          data: {
            token: res.data.data.token,
            name: res.data.data.name,
            id: res.data.data.id,
          },
        });
        this.props.navigation.navigate("Home");
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e.response.data.message);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 50 }}>
          ログイン
        </Text>
        <Item style={{ width: "70%", marginBottom: 50 }}>
          <Input
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            style={styles.nameInput}
            placeholder="ユーザー名を入力"
          />
        </Item>
        <Button
          onPress={() => {
            this.onPressButton();
          }}
          style={{
            width: "70%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            ログイン
          </Text>
        </Button>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("SignUp")}
          style={{ alignSelf: "center", color: "primary" }}
        >
          <Text
            style={{ alignSelf: "center", color: "#2E88F0", marginTop: 20 }}
          >
            アカウントをお持ちでない方はこちら
          </Text>
        </Button>
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
    backgroundColor: "#fff",
  },
  Title: {},
  nameInput: {
    // borderWidth: 1,
    // borderColor: "#333",
    // marginTop: 10,
    // marginBottom: 10,
    // width: "70%",
  },
});
