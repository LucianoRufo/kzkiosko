import React from "react";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "react-native-ui-kitten";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AppNavigator from "./AppNavigator";

import "./initializeFirebase";

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <IconRegistry icons={EvaIconsPack} />
      <AppNavigator />
    </ApplicationProvider>
  );
}
