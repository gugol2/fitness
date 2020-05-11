import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { receiveEntries, addEntry } from '../../actions';
import { timeToString, getDailyReminderValue } from '../../utils/helpers';
import { fetchCalendarResults } from '../../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar-fix';
import { DateHeader } from '../DateHeader';
import { MetricCard } from '../MetricCard';
import { AppLoading } from 'expo';
import { styles } from './styles';

export const History = props => {
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
    <View style={styles.item}>
      {today ? (
        <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.noDataText}>{today}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => console.log('Pressed!')}>
          <MetricCard date={formattedDate} metrics={metrics} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyDate = formattedDate => {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    );
  };

  const { entries } = props;

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <UdaciFitnessCalendar
      items={entries}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
};
