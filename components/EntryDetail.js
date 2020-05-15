import React, { useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MetricCard } from './MetricCard';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import { TextButton } from './TextButton';
import { removeEntry } from '../utils/api';
import { addEntry } from '../actions';
import { timeToString } from '../utils/helpers';

const shouldNotRerender = (prevProps, nextProps) => {
  return nextProps.metrics === null;
};

const myComponent = ({
  navigation,
  entryId,
  metrics,
  formattedDate,
  remove,
  goBack,
}) => {
  // const setTitle = entryId => {
  //   if (!entryId) return;

  //   const year = entryId.slice(0, 4);
  //   const month = entryId.slice(5, 7);
  //   const day = entryId.slice(8);

  //   navigation.setOptions({
  //     title: `${month}/${day}/${year}`,
  //   });
  // };

  const reset = () => {
    remove();
    goBack();
    removeEntry(entryId);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: formattedDate,
    });
  }, [navigation, entryId]);

  return (
    <View style={styles.container}>
      <MetricCard metrics={metrics} />
      <TextButton onPress={reset} style={{ margin: 20 }}>
        Reset
      </TextButton>
    </View>
  );
};

const EntryDetail = React.memo(myComponent, shouldNotRerender);

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

const mapDispatchToProps = (dispatch, { route, navigation }) => {
  const { entryId } = route.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        }),
      ),
    goBack: () => navigation.goBack(),
  };
};

export const ConnectedEntryDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryDetail);
