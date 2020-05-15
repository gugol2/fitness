import React, { useState } from 'react';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from '../../utils/helpers';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { AppSlider } from '../AppSlider';
import { Steppers } from '../Steppers';
import { DateHeader } from '../DateHeader';
import { TextButton } from '../TextButton';
import { Ionicons } from '@expo/vector-icons';
import { submitEntry, removeEntry } from '../../utils/api';
import { addEntry } from '../../actions';
import { SubmitBtn } from '../SubmitBtn';
import { white } from '../../utils/colors';
import { CommonActions } from '@react-navigation/native';

export const AddEntry = ({ dispatch, alreadyLogged, navigation }) => {
  const initialState = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  const [state, setState] = useState(initialState);

  const increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    const count = state[metric] + step;

    const newState = {
      ...state,
      [metric]: count > max ? max : count,
    };

    setState(newState);
  };

  const toHome = () => {
    navigation.dispatch(
      CommonActions.goBack({
        key: 'AddEntry',
      }),
    );
  };

  const decrement = metric => {
    const count = state[metric] - getMetricMetaInfo(metric).step;

    const newState = {
      ...state,
      [metric]: count < 0 ? 0 : count,
    };

    setState(newState);
  };

  const slide = (metric, value) => {
    const newState = {
      ...state,
      [metric]: value,
    };

    setState(newState);
  };

  const metaInfo = getMetricMetaInfo();

  const submit = () => {
    const key = timeToString();
    const entry = state;

    // Update Redux
    dispatch(
      addEntry({
        [key]: entry,
      }),
    );

    // Reset the state
    setState({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 });

    // Navigate to home
    toHome();

    // Save to "DB"
    submitEntry({ key, entry });

    // Clear local notification
  };

  const reset = () => {
    const key = timeToString();

    // Update Redux
    dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      }),
    );

    // Route to Home
    toHome();

    // Update DB
    removeEntry(key);
  };

  if (alreadyLogged) {
    return (
      <View style={styles.center}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
          size={100}
        />
        <Text>You already logged your information for today.</Text>
        <TextButton onPress={reset} style={{ padding: 10 }}>
          Reset
        </TextButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />

      <Text>{JSON.stringify(state)}</Text>

      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = state[key];

        return (
          <View key={key} style={styles.row}>
            {getIcon()}
            {type === 'slider' ? (
              <AppSlider
                value={value}
                onChange={value => slide(key, value)}
                {...rest}
              />
            ) : (
              <Steppers
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
      <SubmitBtn onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});
