import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import { range, padStart } from 'lodash';
import styles from './styles';

export default ({selected, onChange}) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = range(10, 25).map((h) => padStart(h, 2, '0'));

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <View style={styles.lineItem}></View>
        {weekDays.map((w) => <Text style={styles.lineItem} key={`week-title-${w}`}>{w}</Text>)}
      </View>
      {hours.map((hour) => (
        <View style={styles.line} key={`hour-${hour}`}>
          <Text  style={styles.lineItem}>{hour}</Text>
          {weekDays.map((w) => <TouchableHighlight style={styles.lineItem} key={`week-hour-${w}`}>
            <View />
          </TouchableHighlight>)}
        </View>
      ))}
    </View>
  );
};
