import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { Switch, Router, Route, Link } from "react-router-dom";
import storage from "../plugins/storage";
import { createMemoryHistory } from "history";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: "",
    };
  }
  async componentDidMount() {
    storage
      .load({ key: "credentials" })
      .then((res) => {
        console.log(res);
        // if (!res.token || !res.name || res.token == "" || res.name == "") {
        //   this.props.navigation.navigate("SignUp");
        // }
        this.setState({ current_user: res.name });
      })
      .catch((err) => {
        console.warn(err);
        this.props.navigation.navigate("SignUp");
      });
  }
  async componentDidUpdate() {
    // storage
    //   .load({ key: "credentials" })
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ current_user: res.name });
    //   })
    //   .catch((err) => {
    //     console.warn(err);
    //     this.props.navigation.navigate("SignUp");
    //   });
  }
  render() {
    const history = createMemoryHistory();

    return (
      <View style={{ flex: 1 }}>
        <Text>こんにちは{this.state.current_user}さん</Text>
        <Button
          title="Go to Camera"
          onPress={() => this.props.navigation.navigate("Camera")}
        />
        <Button
          title="Go to SignUp"
          onPress={() => this.props.navigation.navigate("SignUp")}
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
