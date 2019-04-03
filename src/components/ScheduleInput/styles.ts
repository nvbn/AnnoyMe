import { StyleSheet } from "react-native";
import * as colors from "../../colors";

export default StyleSheet.create({
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
