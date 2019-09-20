import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductScanner from "./screens/ProductScanner";
import Profile from "./screens/Profile";

const AppNavigator = createStackNavigator(
  {
    ProductScanner: { screen: ProductScanner },
    Profile: { screen: Profile },
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(AppNavigator);
