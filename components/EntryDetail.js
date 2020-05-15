import React, { useLayoutEffect, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MetricCard } from './MetricCard';
import { connect } from 'react-redux';
import { white } from '../utils/colors';

const EntryDetail = ({ navigation, entryId, metrics, formattedDate }) => {
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
    <View style={styles.container}>
      <MetricCard metrics={metrics} date={formattedDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

const mapStateToProps = (state, { route }) => {
  const { entryId, formattedDate } = route.params;

  return {
    entryId,
    metrics: state[entryId],
    formattedDate,
  };
};

export const ConnectedEntryDetail = connect(mapStateToProps)(EntryDetail);
