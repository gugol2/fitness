import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { Slider } from './Slider';
import { Stepper } from './Stepper';
import { DateHeader } from './DateHeader';

export const AddEntry = props => {
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

    const count = initialState[metric] + step;

    const newState = {
      ...state,
      [metric]: count > max ? max : count,
    };

    setState(newState);
  };

  const decrement = metric => {
    const count = initialState[metric] - getMetricMetaInfo(metric).step;

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

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = state[key];

        return (
          <View key={key}>
            {getIcon()}
            {type === 'slider' ? (
              <Slider
                value={value}
                onChange={value => slide(key, value)}
                {...rest}
              />
            ) : (
              <Stepper
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
