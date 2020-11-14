import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Input, Item, Button } from "native-base";
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
      errorText: "",
      items: [],
      isSubmitBtnDisabled: true,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
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
          headers: { Authorization: `Token ${this.state.user.token}` },
        }
      )
      .then((res) => {
        console.log(res);
        const newArray = this.state.items.map((item) => {
          return item;
        });
        newArray.push(input);
        this.setState({ items: newArray });
        this.setState({ currentInput: "" });
        this.setState({ isSubmitBtnDisabled: false });
      })
      .catch((e) => {
        if (e.response.data.message[0] == "Nameを入力してください") {
          this.setState({ errorText: "所持品名を入力してください" });
        } else {
          this.setState({ errorText: "エラーが発生しました" });
        }
        console.log(e.response.data.message[0]);
      });
  }
  async onPressNextButton() {
    this.props.navigation.navigate("Home");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>持ち物を登録しよう！</Text>
        <View style={styles.inputWrapper}>
          <Item style={{ width: "70%" }} regular>
            <Input
              onChangeText={(currentInput) => {
                this.setState({ errorText: "" });
                this.setState({ currentInput });
              }}
              value={this.state.currentInput}
              style={styles.input}
              placeholder="所持品名"
            />
          </Item>
          <Button style={styles.button} onPress={() => this.onPressAddButton()}>
            <Text style={{ color: "#fff" }}>追加</Text>
          </Button>
        </View>
        <Text style={styles.errorText}>{this.state.errorText}</Text>
        <ScrollView
          style={{
            backgroundColor: "transparent",
            width: "100%",
          }}
        >
          {this.state.items.map((item, i) => {
            return (
              <Text
                key={"item" + i}
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            );
          })}
        </ScrollView>
        <Button
          style={styles.submitButton}
          disabled={this.state.isSubmitBtnDisabled}
          onPress={() => this.onPressNextButton()}
        >
          <Text style={{ color: "#fff" }}>完了</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 130,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    width: "80%",
    marginTop: 40,
    marginBottom: 50,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    width: "25%",
    marginLeft: 10,
    height: "100%",
  },
  submitButton: {
    alignSelf: "center",
    justifyContent: "center",
    width: "70%",
    marginTop: 100,
  },
});
