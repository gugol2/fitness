import React from 'react';
import { Text, View } from 'react-native';

export const EntryDetail = ({ navigation, route }) => {
  const { entryId } = route.params;

  return (
    <View>
      <Text>Entry Detail - {JSON.stringify(entryId)}</Text>
    </View>
  );
};
