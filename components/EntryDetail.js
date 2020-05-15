import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

export const EntryDetail = ({ navigation, route }) => {
  const { entryId } = route.params;

  const setTitle = entryId => {
    if (!entryId) return;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  };

  useLayoutEffect(() => {
    setTitle(entryId);
  }, [navigation, entryId]);

  return (
    <View>
      <Text>Entry Detail - {JSON.stringify(entryId)}</Text>
    </View>
  );
};
