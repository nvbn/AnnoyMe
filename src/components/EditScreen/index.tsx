import React, { PureComponent } from "react";
import { View, TextInput, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../colors";
import * as routes from "../../routes";
import { Annoy, AnnoySchedule } from "../../types";
import ScheduleInput from "../ScheduleInput";
import styles from "./styles";

interface Props extends NavigationScreenProps {
  startHour: number;
  endHour: number;
  annoy?: Annoy;

  updateAnnoy: (annoy: Annoy) => void;
  deleteAnnoy: (id: string) => void;
}

interface State {
  isTitleValid: boolean;
}

export default class EditScreen extends PureComponent<Props> {
  static navigationOptions = {
    title: "Change the annoyance",
  };

  readonly state: State = {
    isTitleValid: true,
  };

  onDeleteClick = () => {
    if (!this.props.annoy) return;

    this.props.navigation.navigate(routes.index);

    this.props.deleteAnnoy(this.props.annoy.id);
  };

  onTitleChange = (title: string) => {
    const isTitleValid = title.length > 0;

    this.setState({ isTitleValid });

    if (this.props.annoy && isTitleValid) {
      this.props.updateAnnoy({
        ...this.props.annoy,
        title,
      });
    }
  };

  onScheduleChange = (schedule: AnnoySchedule) => {
    if (!this.props.annoy) return;

    this.props.updateAnnoy({
      ...this.props.annoy,
      schedule,
    });
  };

  render() {
    if (!this.props.annoy) {
      // When it's already deletd
      return <View />;
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            this.state.isTitleValid ? styles.inputValid : styles.inputInvalid,
          ]}
          placeholder="Name of the annoyance"
          defaultValue={this.props.annoy.title}
          onChangeText={this.onTitleChange}
        />
        <ScheduleInput
          startHour={this.props.startHour}
          endHour={this.props.endHour}
          onChange={this.onScheduleChange}
          schedule={this.props.annoy.schedule}
        />
        {this.state.isTitleValid === true && (
          <FloatingAction
            position="right"
            color={colors.red400}
            showBackground={false}
            onPressMain={this.onDeleteClick}
            floatingIcon={<Icon name="delete" size={25} color="white" />}
          />
        )}
      </View>
    );
  }
}
