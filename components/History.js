import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar-fix';

const History = props => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { dispatch } = props;

    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))

      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            }),
          );
        }
      })
      .then(() => setReady(!ready));
  }, []);

  const renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      {today ? (
        <Text>{JSON.stringify(today)}</Text>
      ) : (
        <Text>{JSON.stringify(metrics)}</Text>
      )}
    </View>
  );

  const renderEmptyDate = formattedDate => {
    return (
      <View>
        <Text>No Data for this day</Text>
      </View>
    );
  };

  const { entries } = props;

  return (
    <UdaciFitnessCalendar
      items={entries}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
};

function mapStateToProps(state) {
  return {
    entries: state,
  };
}

export const ConnectedHistory = connect(mapStateToProps)(History);
