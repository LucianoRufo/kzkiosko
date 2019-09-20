import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import styled from "styled-components/native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Icon, Button } from "react-native-ui-kitten";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Container from "../components/Container";

export default function ProductScanner({ navigation }) {
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    getPermissionsAsync();
  }, []);

  return (
    <Container>
      <Camera
        ratio="16:9"
        onBarCodeScanned={hasScanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <ProfileButton
        onPress={() => navigation.navigate("Profile")}
        icon={() => <Icon fill="white" name="person-outline" />}
      />
    </Container>
  );

  async function getPermissionsAsync() {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async function handleBarCodeScanned({ data }) {
    setHasScanned(true);
    Alert.alert("Confirm purchase ", `Are you sure you want to buy ${data}?`, [
      {
        text: "Yes",
        onPress: () => setHasScanned(false),
      },
      {
        text: "No",
        onPress: () => setHasScanned(false),
        style: "cancel",
      },
    ]);
  }
}

const ProfileButton = styled(Button)`
  position: absolute;
  top: ${getStatusBarHeight() + 25}px;
  right: 25px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
