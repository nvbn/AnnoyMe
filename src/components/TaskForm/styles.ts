import { StyleSheet } from "react-native";
import * as colors from "../../constants/colors";

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
  scheduleInputContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  scheduleInputLine: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  scheduleInputBox: {
    flex: 1,
    height: 25,
    borderWidth: 1,
    borderColor: colors.grey200,
  },
  scheduleInputLabelBox: {
    backgroundColor: colors.grey200,
  },
  scheduleInputLabel: {
    textAlign: "center",
  },
  scheduleInputBoxNotSelected: {},
  scheduleInputBoxSelected: {
    backgroundColor: colors.green200,
  },
});
