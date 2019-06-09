import { StyleSheet } from "react-native";
import * as colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  itemContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.grey200,
  },
  itemTitle: {
    padding: 20,
    fontWeight: "400",
  },
  itemActive: {
    backgroundColor: colors.green400,
  },
  itemInactive: {},
});
