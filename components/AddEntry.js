import React, { useState } from 'react';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { View, TouchableOpacity, Text } from 'react-native';
import { AppSlider } from './AppSlider';
import { Steppers } from './Steppers';
import { DateHeader } from './DateHeader';
import { TextButton } from './TextButton';
import { Ionicons } from '@expo/vector-icons';

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
};

export const AddEntry = props => {
  const initialState = {
    run: 1,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 10,
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

    setState({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 });

    // Navigate to home

    // Save to "DB"

    // Clear local notification
  };

  const reset = () => {
    const key = timeToString();

    // Update Redux

    // Route to Home

    // Update DB
  };

  if (props.alreadyLogged) {
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
