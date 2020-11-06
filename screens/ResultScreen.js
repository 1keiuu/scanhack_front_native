import React from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { Button } from "native-base";
import LottieView from "lottie-react-native";

export default class ResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lost_items: [],
      isLottieActive: false,
    };
  }

  static navigationOptions = {
    mode: "modal",
  };

  async componentDidMount() {
    const lostItems = this.props.navigation.state.params.lost_items;
    this.setState({ lost_items: lostItems });

    if (this.props.navigation.state.params.lost_items.length === 0) {
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 2000);
    }
  }

  onButtonPress() {
    this.setState({ isLottieActive: true });
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 2000);
  }

  render() {
    if (this.props.navigation.state.params.lost_items.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.lottie}>
            <View style={styles.lottieInner}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 450,
                }}
              >
                忘れ物はありません！
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 250,
                }}
              >
                いってらっしゃい！
              </Text>
              <LottieView
                source={require("../assets/animations/car.json")}
                autoPlay
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={
              this.state.isLottieActive ? styles.lottie : { display: "none" }
            }
          >
            <View style={styles.lottieInner}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 450,
                }}
              >
                いってらっしゃい！
              </Text>
              <LottieView
                source={require("../assets/animations/car.json")}
                autoPlay
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>忘れ物をしていませんか？</Text>
            <View style={styles.itemsWrapper}>
              {this.state.lost_items.map((label, i) => {
                return (
                  <Text style={{ color: "#333" }} key={"item" + i}>
                    {label}
                  </Text>
                );
              })}
            </View>
            <Button
              style={{
                width: "70%",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
              onPress={() => this.onButtonPress()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                出かける
              </Text>
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 30,
  },
  itemsWrapper: {
    height: "25%",
  },
  lottieInner: {
    flex: 2,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  lottie: {
    position: "absolute",
    top: 0,
    zIndex: 99,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
  },
});
