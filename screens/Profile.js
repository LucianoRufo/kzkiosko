import { get } from "lodash";
import React from "react";
import { ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";
import { observer } from "mobx-react";
import styled from "styled-components/native";
import { Icon, Button, Text } from "react-native-ui-kitten";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import Container from "../components/Container";
import PurchasesList from "../components/PurchasesList";
import authState from "../states/authState";
import authConfig from "../authConfig";

export default observer(function Profile({ navigation }) {
  return (
    <Container>
      <User>
        <UserName>
          <Icon name="person-outline"></Icon>
          <Text>{get(authState, "user.name", "")}</Text>
        </UserName>
        <Button onPress={signOut} size="tiny">
          Sign Out
        </Button>
      </User>
      <BackButton
        appearance="ghost"
        icon={() => <Icon name="arrow-back-outline"></Icon>}
        onPress={() => navigation.goBack()}
      ></BackButton>
      <ScrollView>
        <PurchasesList></PurchasesList>
      </ScrollView>
    </Container>
  );

  async function signOut() {
    await Google.logOutAsync({
      accessToken: authState.accessToken,
      ...authConfig,
    });
    firebase.auth().signOut();
    navigation.reset([NavigationActions.navigate({ routeName: "SignIn" })], 0);
  }
});

const User = styled.View`
  padding-vertical: 60px;
  justify-content: center;
  align-items: center;
`;
const UserName = styled.View`
  margin-bottom: 15px;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: ${getStatusBarHeight() + 25}px;
  left: 25px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
