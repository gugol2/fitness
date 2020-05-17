import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export const Live = () => {
  const [state, setstate] = useState({
    coords: null,
    status: null,
    direction: '',
  });

  const { status, coords, direction } = state;

  if (status === null) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (status === 'denied') {
    return (
      <View>
        <Text>Denied</Text>
      </View>
    );
  }

  if (status === 'undetermined') {
    return (
      <View>
        <Text>undetermined</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Live</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};
