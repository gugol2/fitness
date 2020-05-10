import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

const History = props => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { dispatch } = props;

    async function saveEntriesToStore() {
      const entries = await fetchCalendarResults();

      const action = await dispatch(receiveEntries(entries));

      if (!action.entries[timeToString()]) {
        await dispatch(
          addEntry({
            [timeToString()]: getDailyReminderValue(),
          }),
        );
      }
    }

    saveEntriesToStore().then(() => setReady(!ready));
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
};

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export const ConnectedHistory = connect(mapStateToProps)(History);
