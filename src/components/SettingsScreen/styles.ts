import { StyleSheet } from "react-native";
import * as colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  inputContainer: {
    paddingBottom: 10,
  },
  inputTitle: {
    fontWeight: "200",
  },
  input: {
    borderBottomWidth: 1,
  },
  inputValid: {
    borderBottomColor: colors.green200,
  },
  inputInvalid: {
    borderBottomColor: colors.red500,
  },
});
