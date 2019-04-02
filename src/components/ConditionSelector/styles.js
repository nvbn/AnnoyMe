import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  line: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  lineItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    minHeight: 20,
    minWidth: 20,
  },
});
