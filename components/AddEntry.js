import React, { useState } from 'react';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from '../utils/helpers';
import { View, Text } from 'react-native';
import { AppSlider } from './AppSlider';
import { Steppers } from './Steppers';
import { DateHeader } from './DateHeader';
import { TextButton } from './TextButton';
import { Ionicons } from '@expo/vector-icons';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { SubmitBtn } from './SubmitBtn';

const AddEntry = ({ dispatch, alreadyLogged }) => {
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

    // Update DB
    removeEntry(key);
  };

  if (alreadyLogged) {
    return (
      <View>
        <Ionicons name={'ios-happy'} size={100} />
        <Text>You already logged your information for today.</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    );
  }

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />

      <Text>{JSON.stringify(state)}</Text>

      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = state[key];

        return (
          <View key={key}>
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

const mapStateToProps = state => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
};

export const ConnectedAddEntry = connect(mapStateToProps)(AddEntry);
