import React from 'react';
import { View } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';

export const AddEntry = props => {
  return <View>{getMetricMetaInfo('bike').getIcon()}</View>;
};
