import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import axios from "../plugins/axios.js";
export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async takePicture() {
    if (this.camera) {
      const pictureData = await this.camera.takePictureAsync({ base64: true });
      // console.log(pictureData.base64);
      // MediaLibrary.saveToLibraryAsync(pictureData.uri);
      // const A = axios.create({
      //   baseURL: "http://10.0.2.2:3000",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-Requested-With": "XMLHttpRequest",
      //   },
      // });
      await axios
        .post(
          "/api/v1/image_annotate",
          { base64: pictureData.base64 },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
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
