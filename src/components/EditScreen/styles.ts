import { StyleSheet } from "react-native";
import * as colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
  },
  inputValid: {
    borderBottomColor: colors.green200,
  },
  inputInvalid: {
    borderBottomColor: colors.red500,
  },
});
