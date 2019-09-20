import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { Icon, Button, Text } from "react-native-ui-kitten";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Container from "../components/Container";
import PurchasesList from "../components/PurchasesList";

export default function Profile({ navigation }) {
  useEffect(() => {}, []);

  return (
    <Container>
      <User>
        <UserName>
          <Icon name="person-outline"></Icon>
          <Text>Carlitos Pepe</Text>
        </UserName>
        <Button size="tiny">Sign Out</Button>
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
}

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
