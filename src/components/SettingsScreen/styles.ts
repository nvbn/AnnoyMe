import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    borderBottomColor: "#e8f5e9",
  },
  inputInvalid: {
    borderBottomColor: "#f44336",
  },
});
