import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import axios from "../plugins/axios.js";
import storage from "../plugins/storage";

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  constructor(props) {
    super(props);
    this.state = {
      lost_items: [],
      user: {
        token: "",
      },
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    storage
      .load({ key: "credentials" })
      .then((res) => {
        console.log(res);
        this.setState({ user: { token: res.token } });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  async takePicture() {
    if (this.camera) {
      const pictureData = await this.camera.takePictureAsync({ base64: true });
      await axios
        .post(
          "/api/v1/image_annotate",
          { base64: pictureData.base64 },
          {
            headers: { Authorization: `Token ${this.state.user.token}` },
          }
        )
        .then((res) => {
          const lostItems = res.data.data;
          this.setState({ lost_items: lostItems });

          console.log(this.state.lost_items);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Flip
                </Text>
              </TouchableOpacity> */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {this.state.lost_items.map((label) => {
                  return <Text style={{ color: "#fff" }}>{label}</Text>;
                })}
              </View>
              <TouchableHighlight
                style={{
                  borderRadius: 50,
                  height: 80,
                  width: 80,
                  marginBottom: 10,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                }}
                underlayColor="#ccc"
                onPress={() => this.takePicture()}
              >
                <View
                  style={{
                    borderRadius: 50,
                    height: 70,
                    width: 70,
                    borderColor: "#333",
                    borderWidth: "1px",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  underlayColor="#ccc"
                >
                  <Text></Text>
                </View>
              </TouchableHighlight>
              {/* <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => this.takePicture()}
              >

                <Button
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 0,
                    marginBottom: 50,
                    border: "1px solid white",
                    backgroundColor: "white",
                  }}
                  title="a"
                ></Button>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      );
    }
  }
}
