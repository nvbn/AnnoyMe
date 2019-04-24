import React, { PureComponent } from "react";
import { ScrollView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import HeaderButtons from "react-navigation-header-buttons";
import { FloatingAction } from "react-native-floating-action";
import { compareDesc } from "date-fns";
import * as colors from "../../colors";
import * as routes from "../../routes";
import { Annoy, ActiveAnnoys, AnnoyItems } from "../../types";
import HeaderButton from "../HeaderButton";
import Item from "./Item";
import styles from "./styles";

interface Props extends NavigationScreenProps {
  annoys: AnnoyItems;
  activeAnnoys: ActiveAnnoys;
}

interface State {
  sortedAnnoys: Array<Annoy>;
}

/**
 * Main screen with list of annoys.
 */
export default class IndexScreen extends PureComponent<Props, State> {
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

  readonly state: State = {
    sortedAnnoys: [],
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      ...state,
      sortedAnnoys: Object.values(props.annoys).sort((a, b) =>
        compareDesc(a.created, b.created),
      ),
    };
  }

  private floatingActionRef: any;

  onActionClick = () => {
    this.props.navigation.navigate(routes.create);

    setTimeout(this.floatingActionRef.reset, 500);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.sortedAnnoys.map(annoy => (
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
