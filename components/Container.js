import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default styled.View`
  position: relative;
  flex: 1;
  padding-top: ${getStatusBarHeight()}px;
`;
