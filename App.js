import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Modal, Button, AsyncStorage, Alert, TouchableHighlight} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import { getDay, getHours, getMinutes } from 'date-fns';
import { range, padStart } from 'lodash';
import ConditionSelector from './src/components/ConditionSelector';

// const rules = {
//   "No drinks today!": (weekDay, hour) => {
//     if ((weekDay < 5 && hour > 18) || hour < 2) return true;

//     if (weekDay === 7) return true;

//     return false;
//   },

//   "No smokes today!":  (weekDay, hour) => {
//     if ((weekDay < 5 && hour > 18) || hour < 2) return true;

//     if (weekDay === 7) return true;

//     return false;
//   },

//   "Go to gym!": (weekDay, hour) => {
//     return weekDay < 5 && (hour > 20 && hour < 23);
//   },

//   "Read some book!": (weekDay, hour) => {
//     return weekDay < 5 && hour > 18;
//   },

//   "Learn dutch!": (weekDay, hour) => {
//     return weekDay < 6 && hour > 22;
//   },

//   "Poke tinder!": (weekDay, hour) => {
//     return hour > 14 && hour < 21;
//   },

//   "Take fruits with you after lunch!":  (weekDay, hour) => {
//     return weekDay < 6 && (hour > 11 && hour < 14);
//   },
// }

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      createModal: false,
      createWhat: "",
      createWhen: "",
      isCreateWhenValid: true,
      rules: [],
    };
  }

  componentDidMount() {
    this.readRules();

    BackgroundTimer.setInterval(this.notify, 5 * 1000);
  }

  readRules = async () => {
    let rules = [];
    try {
      const rawRules = await AsyncStorage.getItem("rules");
      rules = JSON.parse(rawRules) || [];
    } catch (e) {
      console.warn(e);
    }

    this.setState({ rules });
  };

  addRule = async () => {
    const rules = [...this.state.rules, [this.state.createWhat, this.state.createWhen]];

    await AsyncStorage.setItem("rules", JSON.stringify(rules));
    this.setState({
      createModal: false,
      createWhat: "",
      createWhen: "",
    });
    await this.readRules();
  };

  onCreateWhenChanged = (text) => {
    const date = new Date();

    const weekDay = getDay(date);
    const hour = getHours(date);
    const minute = getMinutes(date);

    let valid = true;
    try {
      eval(`var w = ${weekDay}, h = ${hour}, m = ${minute};` + text);
    } catch (e) {
      console.info(e);
      valid = false;
    }

    this.setState({
      createWhen: text,
      isCreateWhenValid: valid,
    });
  };

  getRules = () => this.state.rules.map(([title, condition]) => [
    title,
    (weekDay, hour, minute) => {
      try {
        return eval(`var w = ${weekDay}, h = ${hour}, m = ${minute}; ${condition}`)
      } catch (e) {
        console.warn(e);
      }
    },
    condition,
  ]);

  deleteRule = (n) =>
    Alert.alert(`Are you sure want to remove ${this.state.rules[n][0]}`, null, [
      {
        text: "Yes",
        onPress: async () => {
          const rules = this.state.rules.filter((_, i) => n !== i);

          await AsyncStorage.setItem("rules", JSON.stringify(rules));
          this.setState({createModal: false})
          await this.readRules();
        },
      },
      { text: 'No', style: 'cancel' },
    ]);

  notify = () => {
    PushNotification.requestPermissions();

    const date = new Date();

    const weekDay = getDay(date);
    const hour = getHours(date);
    const minute = getMinutes(date);

    const message = this
      .getRules()
      .filter(([_, predicate]) => predicate(weekDay, hour, minute))
      .map(([title]) => title)
      .join("\n");

    if (message) {
      console.log(message);

      PushNotification.localNotification({
        message: this
          .getRules()
          .filter(([_, predicate]) => predicate(weekDay, hour, minute))
          .map(([title]) => title)
          .join("\n")
      });
    }
  }

  render() {
    const date = new Date();

    const weekDay = getDay(date);
    const hour = getHours(date);
    const minute = getMinutes(date);

    return (
      <View style={styles.container}>
        <ConditionSelector />
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Going to annoy you!</Text>
        {this.getRules().map(([title, predicate, condition], n) =>
          (<View style={[
            predicate(weekDay, hour, minute) ? styles.active : styles.inactive,
            styles.ruleContainer
          ]} key={`rule-${n}`}>
            <View style={styles.ruleInfo}>
              <Text style={styles.ruleTitle}>{title}</Text>
              <Text style={styles.ruleCondition}>{condition}</Text>
            </View>
            <Button title="x" onPress={() => this.deleteRule(n)} />
          </View>))}

        <View style={styles.addButton}>
          <Button
            title="Add new rule"
            onPress={() => this.setState({createModal: true})}
          />
        </View>

        <ConditionSelector />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.createModal}
        >
          <TextInput
            placeholder="What"
            onChangeText={(text) => this.setState({createWhat: text})}
            value={this.state.createWhat}
          />
          <TextInput
            style={this.state.isCreateWhenValid ? styles.valid : styles.invalid}
            placeholder="When in JS: w (weekDay), h (hour) and m (minute)"
            onChangeText={this.onCreateWhenChanged}
            value={this.state.createWhen}
          />
          <Button title="Cancel" onPress={() => this.setState({createModal: false})} />
          <Button
            title="Add"
            disabled={!this.state.isCreateWhenValid || !this.state.createWhat.length}
            onPress={this.addRule}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  active: {
    backgroundColor: "#db3b21",
  },
  valid: {
    color: "#75d09b",
  },
  invalid: {
    color: "#e67664",
  },
  ruleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  ruleInfo: {
    flex: 1,
  },
  ruleTitle: {
    fontSize: 18,
  },
  addButton: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
});
