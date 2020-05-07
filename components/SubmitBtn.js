import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
};
