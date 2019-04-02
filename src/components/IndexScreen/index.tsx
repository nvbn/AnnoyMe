import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import HeaderButtons from "react-navigation-header-buttons";
import * as routes from "../../routes";
import HeaderButton from "../HeaderButton";

export default class IndexScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: "AnnoyMe!",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <HeaderButtons.Item
          title="Settings"
          iconName="settings"
          onPress={() => navigation.navigate(routes.settings)}
        />
      </HeaderButtons>
    ),
  });

  render() {
    return (
      <View>
        <Text>View screen!!</Text>
      </View>
    );
  }
}
