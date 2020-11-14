import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "native-base";
import storage from "../plugins/storage";
import { createMemoryHistory } from "history";
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: "",
    };
  }
  static navigationOptions = {
    headerTitle: "ホーム",
    headerLeft: null,
  };
  async componentDidMount() {
    storage
      .load({ key: "credentials" })
      .then((res) => {
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
  async componentDidUpdate() {}
  render() {
    const history = createMemoryHistory();

    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 150 }}>
          こんにちは {this.state.current_user}さん
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate("Camera")}
          style={{
            width: 180,
            height: 180,
            borderRadius: 180 / 2,
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon type="Entypo" name="camera" style={{ fontSize: 40 }} />
          <Text style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>
            カメラを開く
          </Text>
        </Button>
        {/* <Button
          title="Go to SignUp"
          onPress={() => this.props.navigation.navigate("SignUp")}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
