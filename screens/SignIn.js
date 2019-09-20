import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import authState from "../states/authState";
import Container from "../components/Container";
import authConfig from "../authConfig";

export default function SignIn({ navigation }) {
  useEffect(() => {
    signInAsync().catch(err => {
      authState.clear();
      AsyncStorage.setItem("@KzKiosko:accessToken", JSON.stringify(null));
      AsyncStorage.setItem("@KzKiosko:user", JSON.stringify(null));
      console.log(err);
    });
  });

  return <Container></Container>;

  async function signInAsync() {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        authState.user = JSON.parse(
          await AsyncStorage.getItem("@KzKiosko:user")
        );
        authState.accessToken = JSON.parse(
          await AsyncStorage.getItem("@KzKiosko:accessToken")
        );
      } else {
        const { type, accessToken, idToken, user } = await Google.logInAsync(
          authConfig
        );
        console.log("TYPE", type);
        if (type === "success") {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken
          );
          await firebase.auth().signInWithCredential(credential);
          AsyncStorage.setItem(
            "@KzKiosko:accessToken",
            JSON.stringify(accessToken)
          );
          AsyncStorage.setItem("@KzKiosko:user", JSON.stringify(user));
          authState.accessToken = accessToken;
          authState.user = user;
        } else {
          throw new Error("User Cancelled Login");
        }
      }
      navigateToProductScanner();
      unsubscribe();
    });
    return null;
  }

  function navigateToProductScanner() {
    navigation.reset(
      [NavigationActions.navigate({ routeName: "ProductScanner" })],
      0
    );
  }
}
