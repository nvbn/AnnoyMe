import React, { PureComponent } from "react";
import { ScrollView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import HeaderButtons from "react-navigation-header-buttons";
import { FloatingAction } from "react-native-floating-action";
import * as colors from "../../colors";
import * as routes from "../../routes";
import { Annoy, ActiveAnnoys } from "../../types";
import HeaderButton from "../HeaderButton";
import Item from "./Item";
import styles from "./styles";

interface Props extends NavigationScreenProps {
  annoys: Array<Annoy>;
  activeAnnoys: ActiveAnnoys;
}

export default class IndexScreen extends PureComponent<Props> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
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

  private floatingActionRef: any;

  onActionClick = () => {
    this.props.navigation.navigate(routes.create);

    setTimeout(this.floatingActionRef.reset, 500);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.annoys.map(annoy => (
          <Item
            item={annoy}
            isActive={this.props.activeAnnoys[annoy.id]}
            key={`annoy-item-${annoy.id}`}
            onPress={() =>
              this.props.navigation.navigate(routes.edit, {
                id: annoy.id,
              })
            }
          />
        ))}
        <FloatingAction
          position="right"
          color={colors.green400}
          showBackground={false}
          onPressMain={this.onActionClick}
          ref={ref => (this.floatingActionRef = ref)}
        />
      </ScrollView>
    );
  }
}
