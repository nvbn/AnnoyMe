import React, { PureComponent } from "react";
import { View, TextInput } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import uuidv4 from "uuid/v4";
import * as colors from "../../colors";
import * as routes from "../../routes";
import { Annoy, AnnoySchedule } from "../../types";
import ScheduleInput from "../ScheduleInput";
import styles from "./styles";

interface Props extends NavigationScreenProps {
  startHour: number;
  endHour: number;

  createAnnoy: (annoy: Annoy) => void;
  refreshIsActive: (date: Date) => void;
}

interface State {
  id: string;
  title: string;
  isTitleValid: boolean;
  schedule: AnnoySchedule;
}

export default class CreateScreen extends PureComponent<Props> {
  static navigationOptions = {
    title: "Create a new annoyance",
  };

  readonly state: State = {
    id: uuidv4(),
    title: "",
    isTitleValid: false,
    schedule: {},
  };

  onSaveClicked = () => {
    this.props.createAnnoy({
      id: this.state.id,
      title: this.state.title,
      schedule: this.state.schedule,
    });

    this.props.refreshIsActive(new Date());

    this.props.navigation.navigate(routes.index);
  };

  onTitleChange = (title: string) => {
    const isTitleValid = title.length > 0;

    this.setState({
      title,
      isTitleValid,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            this.state.isTitleValid ? styles.inputValid : styles.inputInvalid,
          ]}
          placeholder="Name of the annoyance"
          onChangeText={this.onTitleChange}
        />
        <ScheduleInput
          startHour={this.props.startHour}
          endHour={this.props.endHour}
          onChange={schedule => this.setState({ schedule })}
          schedule={this.state.schedule}
        />
        {this.state.isTitleValid === true && (
          <FloatingAction
            position="right"
            color={colors.green400}
            showBackground={false}
            onPressMain={this.onSaveClicked}
            floatingIcon={<Icon name="save" size={25} color="white" />}
          />
        )}
      </View>
    );
  }
}
