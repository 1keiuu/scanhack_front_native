import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class ResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lost_items: [],
    };
  }

  static navigationOptions = {
    mode: "modal",
  };

  async componentDidMount() {
    const lostItems = this.props.navigation.state.params.lost_items;
    this.setState({ lost_items: lostItems });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
          {this.state.lost_items.map((label) => {
            return <Text style={{ color: "#333" }}>{label}</Text>;
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});
